import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    release_date:{
        type:Date,
        required:true,
    },
    budget:{
        type:Number,
        required:true
    },
    collections:{
        type:Number,
        default:0
    },
    director:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    cast:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"MovieMember",
        validate: {
            validator: function (v:any) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'A movie must have at least one actor.'
        },
        required: true
    },
    producers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"MovieMember",
        validate: {
            validator: function (v:any) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'A movie must have at least one producer.'
        },
        required: true
    },

})

export const Movie = mongoose.model("Movie",movieSchema)