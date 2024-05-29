import { IUser } from "../interfaces";
import { User } from "../models";
import bcrypt from "bcrypt"
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";

export class UserService{
    async getAllUsers(){
        const data = await User.find({})
        if(data.length==0){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"users fetched successfully")
    }

    async createUser(userdata:IUser){
        userdata.password= await bcrypt.hash(userdata.password,10)
        const data = await User.create(userdata)
        return new ApiResponse(SuccessCodes.created,data,"user registered successfully")
    }

    async getUserById(id:string){
        const data = await User.findById(id)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"user fetched successfully")
    }
    
    async updateUser(id:string,userdata:IUser){
        userdata.password= await bcrypt.hash(userdata.password,10)
        const data = await User.findByIdAndUpdate(id,userdata)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"user updated successfully")
    }

    async deleteUser(id:string){
        const data = await User.findByIdAndDelete(id)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"user deleted successfully")
    }
}