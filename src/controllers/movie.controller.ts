import { Response } from "express";
import { IMovie, newRequest } from "../interfaces";
import { MovieService } from "../services";
import { ApiError, ErrorCodes } from "../utils";

const service = new MovieService()
export class MovieController{
    async getAllMovies(req:newRequest,res:Response){
        try {
            const userid = req.userid
            const role = req.role
            const response = await service.getAllMovies(userid,role)
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
                    message:`Error while getting all movies: ${error.message}`
                })
            }
        }
    }
    async createMovie(req:newRequest,res:Response){
        try {
            const userid = req.userid
            const moviedata :IMovie = req.body
            const response = await service.createMovie(moviedata,userid)
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while adding movie: ${error.message}`
            })
        }
    }

    async updateMovie(req:newRequest,res:Response){
        try {
            const moviedata :IMovie = req.body
            const {id} = req.params
            const response = await service.updateMovie(id,moviedata)
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
                    message:`Error while updating movie: ${error.message}`
                })
            }
        }
    }

    async deleteMovie(req:newRequest,res:Response){
        try {
            const {id} = req.params
            const response = await service.deleteMovie(id)
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
                    message:`Error while deleting movie: ${error.message}`
                })
            }
        }
    }
}