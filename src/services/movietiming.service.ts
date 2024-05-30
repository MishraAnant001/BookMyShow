import { MovieTiming, Theatre } from "../models";
import { IMovieTiming } from "../interfaces";
import { ApiError, ErrorCodes, ApiResponse, SuccessCodes } from "../utils";

export class MovieTimingService{
    async getAllMovietimings(userid?:string,role?:string){
        let data = null;
        if(role==="theatreadmin"){
            const theatres = await Theatre.find({owner:userid})
            const allTheatresIds= theatres.map((item)=>item._id)
            data = await MovieTiming.find({
                theatre:{
                    $in:allTheatresIds
                }
            })
        }else{
            data = await MovieTiming.find({})
        }
        if (data.length == 0) {
            throw new ApiError(ErrorCodes.notFound, "No movie timing found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "movie timings fetched successfully")
    }

    async createMovietiming(movietiningdata: IMovieTiming) {
        const movie= await MovieTiming.findOne({
            slot:movietiningdata.slot,
            release_day:movietiningdata.release_day
        })
        // console.log(movie)
        if(movie){
            throw new ApiError(ErrorCodes.badRequest, "slot already booked")
        }
        movietiningdata.available_seats=movietiningdata.total_seats
        // console.log(movietiningdata)
        const data = await MovieTiming.create(movietiningdata)
        return new ApiResponse(SuccessCodes.created, data, "movie timing added successfully")
    }

    async updateMovietiming(movietimingid:string,movietiningdata: IMovieTiming){
        const data = await MovieTiming.findByIdAndUpdate(movietimingid,movietiningdata)
        if(!data){
            throw new ApiError(ErrorCodes.notFound, "No movie timing found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "movie timing updated successfully")

    }
    async deleteMovietiming(movietimingid:string){
        const data = await MovieTiming.findByIdAndDelete(movietimingid)
        if(!data){
            throw new ApiError(ErrorCodes.notFound, "No movie timing found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "movie timing deleted successfully")

    }
}