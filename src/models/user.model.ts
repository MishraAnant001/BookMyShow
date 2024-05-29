import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:"{VALUE} is not a valid gender"
        },
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:{
            values:["user","superadmin","director","theatreadmin"],
            message:"{VALUE} is not a valid role"
        },
    }
})

export const User = mongoose.model("User",userSchema)