import Product from"../../models/Product"
import connectDB from "../../middleware/mongoose"

const handler = async (req,res)=>{
    if(req.method=='POST'){
        let p = new Product({
            title:req.body.title,
        slug:req.body.slug,
        image:req.body.image,
        desc:req.body.desc,
        size:req.body.size,
        color:req.body.color,
        category:req.body.category,
        price:req.body.price,
        availableQty:req.body.availableQty
        })
       await p.save();
       res.status(200).json({success:"success",p:p});
    }
    else{
        res.status(400).json({error:"Invalid Method"});
    }
    
}

export default connectDB(handler);