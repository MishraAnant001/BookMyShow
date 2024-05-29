import { User } from "../models";
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "config"

export class LoginService{
    async loginUser(email:string,password:string){
        const user = await User.findOne({
            email:email
        })
        if(!user){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        const verify = await bcrypt.compare(password,user.password)
        if(!verify){
            throw new ApiError(ErrorCodes.unauthorized,"invalid password")
        }
        const secretKey:string = config.get("SECRET_KEY")||"secretkey"
        const token = jwt.sign({
            userid:user._id,
            role:user.role
        },secretKey,{
            expiresIn:"24h"
        })
        return new ApiResponse(SuccessCodes.ok,token,"user login successful")
    }
}