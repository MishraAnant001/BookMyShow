import { ITheatre } from "../interfaces";
import { Theatre } from "../models";
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";

export class TheatreService {
    async getAllTheatres(userid?: string,role?:string) {
        let data = null;
        if(role==="theatreadmin"){

            data = await Theatre.find({ owner: userid })
        }else{
            data = await Theatre.find({})
        }
        if (data.length == 0) {
            throw new ApiError(ErrorCodes.notFound, "No theatres found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "theatres fetched successfully")
    }

    async createTheatre(theatredata: ITheatre, userid?: string) {
        if(userid){

            theatredata.owner = userid
        }
        const data = await Theatre.create(theatredata)
        return new ApiResponse(SuccessCodes.created, data, "theatre added successfully")
    }

    async updateTheatre(theatreid: string,theatredata: ITheatre) {
        const data = await Theatre.findByIdAndUpdate(theatreid, theatredata)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No theatre found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "theatre updated successfully")

    }
    async deleteTheatre(theatreid: string) {
        const data = await Theatre.findByIdAndDelete(theatreid)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No theatre found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "theatre deleted successfully")

    }
}