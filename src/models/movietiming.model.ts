import mongoose from "mongoose";

const movieTimingSchema = new mongoose.Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    theatre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Theatre",
        required:true
    },
    slot:{
        type:String,
        enum:{
            values:["9-12","13-16","17-20","21-0"],
            message:"{VALUE} is not a valid slot",
        },
        required:true
    },
    release_day:{
        type:Date,
        required:true,
    },
    ticket_price:{
        type:Number,
        required:true,
    },
    total_seats:{
        type:Number,
        required:true,
    },
    available_seats:{
        type:Number,
        required:true,
    }
})

export const MovieTiming = mongoose.model("MovieTiming",movieTimingSchema)