import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'
const handler= async (req, res)=> {
    if(req.method=='POST'){
    let jwt= req.body.token; 
    let usrtoken = jsonwebtoken.verify(jwt,process.env.JWT_SECRET)
    let user = await User.findOne({email:usrtoken.email})
    let {name,email,address,pincode,phone}=user;
    res.status(200).json({name,email,address,pincode,phone})
    }
    else{
    res.status(400).json({error:"error"})
    }
  }
export default connectDB(handler);
  