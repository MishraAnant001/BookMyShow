import { Request, Response } from "express"
import { IUser } from "../interfaces"
import { ApiError, ErrorCodes } from "../utils"
import { UserService } from "../services"
const service = new UserService()
export class SignupController{
    
    async signupUser(req:Request,res:Response){
        try {
            const userdata:IUser=req.body
            const response = await service.createUser(userdata)
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
                    message:`Error while registering the user: ${error.message}`
                })
            }
        }
    }
}