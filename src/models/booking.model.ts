import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    movie_timing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MovieTiming",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    num_of_tickets:{
        type:Number,
        required:true
    }
})

export const Booking = mongoose.model("Booking",bookingSchema)