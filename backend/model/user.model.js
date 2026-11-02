import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   FirstName:{
    type:String,
    required:true
   },
   LastName:{
    type:String,
    required:true
   },
   username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    ProfileImage:{
        type:String,
        
    }
},
{ 
    timestamps:true
});

const User = mongoose.model("User" , userSchema)
export default User;