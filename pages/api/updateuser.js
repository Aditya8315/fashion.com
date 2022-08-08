import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'
const handler= async (req, res)=> {
    if(req.method=='POST'){
    let jwt= req.body.token; 
    let token = jsonwebtoken.verify(jwt,process.env.JWT_SECRET)
    let user = await User.findOneAndUpdate({email:token.email},{address:req.body.address , pincode:req.body.pincode , name:req.body.name, phone:req.body.phone})
    res.status(200).json({success:true})
    }
    else{
    res.status(400).json({error:"error"})
    }
  }
export default connectDB(handler);
  