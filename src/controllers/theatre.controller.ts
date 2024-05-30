import { Response } from "express";
import { ITheatre, newRequest } from "../interfaces";
import { TheatreService } from "../services";
import { ApiError, ErrorCodes } from "../utils";

const service = new TheatreService()
export class TheatreController{
    async getAllTheatres(req:newRequest,res:Response){
        try {
            const userid = req.userid
            const role = req.role
            const response = await service.getAllTheatres(userid,role)
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
                    message:`Error while getting all theatres: ${error.message}`
                })
            }
        }
    }
    async createTheatre(req:newRequest,res:Response){
        try {
            const userid = req.userid
            const theatredata: ITheatre = req.body
            const response = await service.createTheatre(theatredata,userid)
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while adding theatre: ${error.message}`
            })
        }
    }

    async updateTheatre(req:newRequest,res:Response){
        try {
            const theatredata: ITheatre = req.body
            const {id} = req.params
            const response = await service.updateTheatre(id,theatredata)
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
                    message:`Error while updating theatre: ${error.message}`
                })
            }
        }
    }

    async deleteTheatre(req:newRequest,res:Response){
        try {
            const {id} = req.params
            const response = await service.deleteTheatre(id)
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
                    message:`Error while deleting theatre: ${error.message}`
                })
            }
        }
    }
}