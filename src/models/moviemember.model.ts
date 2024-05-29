import mongoose from "mongoose";

const movieMemberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
  role:{
    type:String,
        required:true,
        enum:{
            values:["actor","producer"],
            message:"{VALUE} is not a valid role"
        }
  }
})

export const MovieMember = mongoose.model("MovieMember",movieMemberSchema)