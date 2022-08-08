import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");

const handler = async (req,res)=>{
    if(req.method=='POST'){
        let {name,email}=req.body;
        let u = new User({name,email,password:CryptoJS.AES.encrypt(req.body.password,process.env.AES_SECRET).toString()})
        await u.save();
        res.status(200).json({success:"success"});
    }
    else{
        res.status(400).json({error:"Invalid Method"});
    }
    
}

export default connectDB(handler);