import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'
var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
const handler= async (req, res)=> {
    if(req.method=='POST'){
    let jwt= req.body.token; 
    let token = jsonwebtoken.verify(jwt,process.env.JWT_SECRET)
    let dbuser= await User.findOne({email:token.email});
    const bytes = CryptoJS.AES.decrypt(dbuser.password,process.env.AES_SECRET);
    console.log(bytes);
    let decryptedpass= bytes.toString(CryptoJS.enc.Utf8);
    if(decryptedpass==req.body.password && req.body.npassword==req.body.cpassword){
    let user = await User.findOneAndUpdate({email:token.email},{password:CryptoJS.AES.encrypt(req.body.npassword,process.env.AES_SECRET).toString()})
    res.status(200).json({success:true})
    }
    else{
        res.status(200).json({success:false})
    }
    }
    else{
    res.status(400).json({error:"error"})
    }
  }
export default connectDB(handler);