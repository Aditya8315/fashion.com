const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
    {   name:{type:String,default:""},
        email: {type:String, required:true},
        phone:{type:String,deafult:""},
        orderId:{type:String,required:true},
        paymentInfo:{type:String,default:""},
        products:{type:Object,req:true},
        address:{type:String,required:true},
        pincode:{type:String,default:''},
        city:{type:String,default:''},
        state:{type:String,default:''},
        txnID:{type:String,default:""},
        amount:{type:Number,required:true},
        status:{type:String,default:'Pending',required:true},
        deliveryStatus:{type:String,default:'unshipped',required:true}

    },{timestamps:true}

);
export default mongoose.models.Order || mongoose.model("Order",OrderSchema);