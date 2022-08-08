const https = require("https");
import Order from "../../models/Order"
import connectDB from "../../middleware/mongoose"
import Product from "../../models/Product"
import pincodes from "../../pincodes.json"

const PaytmChecksum = require("paytmchecksum");
const handler = async (req,res)=>{
  if (req.method == "POST") {
    //check if pincode is servicable
    if(!(Object.keys(pincodes).includes(req.body.pincode))){
        res.status(200).json({success:false,"error":"Pincode is Not serviceable",cartclr:false})
        return
    }
    //check if cart is tempered
    let product, sumtotal=0;
    let cart = req.body.cart
    if(req.body.total <=0){
      res.status(200).json({success:false,"error":"Pls build cart",cartclr:false})
      return
    }
    for(let item in cart){
      sumtotal+=cart[item].price * cart[item].qty
      product = await Product.findOne({slug:item})
      if(product.availableQty < cart[item].qty){
        res.status(200).json({success:false,"error":"Some items are out of stock",cartclr:true})
        return
      }
      if(product.price != cart[item].price){
        res.status(200).json({success:false,"error":"Price has been changed",cartclr:true})
        return
      }
    }
    if(sumtotal!=req.body.total){
      res.status(200).json({success:false,"error":"Price has been changed",cartclr:true})
      return
    }
    //check if cart items are out of stock

    //check if details are valid
    if(req.body.phone.length != 10 || !Number.isInteger(Number(req.body.phone))){
      res.status(200).json({success:false,"error":"Enter 10 digit Phone Number",cartclr:false})
      return
    }
    if(req.body.pincode.length != 6 || !Number.isInteger(Number(req.body.pincode))){
      res.status(200).json({success:false,"error":"Enter 6 digit Pincode",cartclr:false})
      return
    }
    //initiate order to save in database
    let order = new Order({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      orderId:req.body.oid,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      pincode:req.body.pincode,
      amount:req.body.total,
      products:req.body.cart
    }
    )
    await order.save()
    //insert an entry in orders table with status pending



    var paytmParams = {};
    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.total,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    let checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_KEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);
    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          // hostname: 'securegw-stage.paytm.in',

          /* for Production */
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            let ress=JSON.parse(response).body
            ress.success=true;
            ress.cartcr=false;
            resolve(ress);
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
    };
    let myr = await requestAsync()
    res.status(200).json(myr)
  }
}
export default connectDB(handler);