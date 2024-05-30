import { Request, Response } from "express";
import { IMovieTiming, newRequest } from "../interfaces";
import { MovieTimingService } from "../services";
import { ApiError, ErrorCodes } from "../utils";

const service = new MovieTimingService()
export class MovieTimingController{
    async getAllMovietimings(req:newRequest,res:Response){
        try {
            const userid = req.userid
            const role = req.role
            const response = await service.getAllMovietimings(userid,role)
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while getting all movie timings : ${error.message}`
                })
            }
        }
    }
    async createMovietiming(req:Request,res:Response){
        try {
            const movietiningdata: IMovieTiming = req.body
            const response = await service.createMovietiming(movietiningdata)
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while adding movie timing: ${error.message}`
            })
        }
    }

    async updateMovietiming(req:newRequest,res:Response){
        try {
            const movietiningdata: IMovieTiming = req.body
            const {id} = req.params
            const response = await service.updateMovietiming(id,movietiningdata)
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while updating movie timing: ${error.message}`
                })
            }
        }
    }

    async deleteMovietiming(req:newRequest,res:Response){
        try {
            const {id} = req.params
            const response = await service.deleteMovietiming(id)
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while deleting movie timing: ${error.message}`
                })
            }
        }
    }
}