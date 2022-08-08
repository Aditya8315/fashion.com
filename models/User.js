import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        name:{type:String, default:""},
        email:{type:String,required:true,unique:true},
        phone:{type:String,default:""},
        password:{type:String,required:true},
        address:{type:String,default:""},
        pincode:{type:String,default:""}

        

    },{timestamps:true}

);
mongoose.models={}
export default mongoose.model("User",UserSchema);