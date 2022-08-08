// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User" 
import connectDB from "../../middleware/mongoose"
var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
const handler = async (req, res)=> {
    if(req.method=='POST'){
        //check if the user exists in db
        let user = await User.findOne({email:req.body.email})
        if(user){
            await User.find({email:req.body.email},{password:CryptoJS.AES.encrypt(req.body.password,process.env.AES_SECRET).toString()})
            res.status(200).json({success:true})
        }
        else{
            res.status(200).json({success:false})
        }
    }
    else{
        res.status(200).json({success:false})
    }
  }
export default connectDB(handler);