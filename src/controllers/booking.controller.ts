import { Response } from "express";
import { Ibooking, newRequest } from "../interfaces";
import { BookingService } from "../services";
import { ApiError, ErrorCodes } from "../utils";

const service = new BookingService()
export class BookingController{
    async getAllbookings(req:newRequest,res:Response){
        try {
            const userid = req.userid
            const role = req.role
            const response = await service.getAllBookings(userid,role)
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
                    message:`Error while getting all bookings: ${error.message}`
                })
            }
        }
    }
    async createbooking(req:newRequest,res:Response){
        try {
            const userid = req.userid
            const bookingdata:Ibooking = req.body
            const response = await service.createbooking(bookingdata,userid)
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while adding booking: ${error.message}`
            })
        }
    }

    async deleteBooking(req:newRequest,res:Response){
        try {
            const {id} = req.params
            const response = await service.deleteBooking(id)
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
                    message:`Error while deleting booking: ${error.message}`
                })
            }
        }
    }
}