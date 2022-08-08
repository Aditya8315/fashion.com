import Order from "../../models/Order"
import connectDB from "../../middleware/mongoose"
import Product from "../../models/Product"
import PaytmCheckSum from "paytmchecksum"
const handler = async (req,res)=>{
  // validate paytm checksum
  var paytmChecksum = "";
  var paytmParams={};
  const recieved_data=req.body
  for(var key in recieved_data){
      if(key=="CHECKSUMHASH"){
        paytmChecksum=recieved_data[key]
      }else{
        paytmParams[key]=recieved_data[key]
      }
  }

  var isValidChecksum = PaytmCheckSum.verifySignature(paytmParams,process.env.PAYTM_MKEY,paytmChecksum);
if(!isValidChecksum){
    res.status(500).send("Some error occured")
    return
}
  //update status into orders 
  let order;
  if(req.body.STATUS=="TXN_SUCCESS"){
  order = await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'Paid',paymentInfo:JSON.stringify(req.body),txnID:req.body.TXNID})
    let products = order.products
    for(let slug in products){
    await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty":- products[slug].qty}}) 
    } 
  }
  else if(req.body.STATUS=="PENDING"){
   order = await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'Pending',paymentInfo:JSON.stringify(req.body),txnID:JSON.stringify(req.body.TXNID)})
  }
  //initiate shiipping
  //redirect to order confirmation
  res.redirect('/order?clearCart=1&id='+ order._id,200)
  res.status(200).json({body:req.body})
}
export default connectDB(handler);