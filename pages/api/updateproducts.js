import Product from"../../models/Product"
import connectDB from "../../middleware/mongoose"

const handler = async (req,res)=>{
    if(req.method=='POST'){
        let p = await Product.findByIdAndUpdate(req.body._id,req.body)
       res.status(200).json({success:"success"});
    }
    else{
        res.status(400).json({error:"Invalid Method"});
    }
    
}

export default connectDB(handler);