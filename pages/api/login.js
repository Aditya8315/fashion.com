import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
var jwt = require('jsonwebtoken');

const handler = async (req,res)=>{
    if(req.method=='POST'){
        let user =await User.findOne({email:req.body.email})
        
        if(user){
        let bytes = CryptoJS.AES.decrypt(user.password,process.env.AES_SECRET)
        let orgpass = bytes.toString(CryptoJS.enc.Utf8);
        console.log(orgpass);
            if(req.body.email==user.email && orgpass==req.body.password){
            var token = jwt.sign({email:user.email,name:user.name},process.env.JWT_SECRET)
            res.status(200).json({success:true,token,email:user.email})
            }else{
            res.status(200).json({success:false,error:"Invalid Credentials"});
            }
        }
        else{
            res.status(200).json({success:"false",error:"No user found"});
        }
    }
    else{
        res.status(400).json({error:"Invalid Method"});
    }
    
}

export default connectDB(handler);