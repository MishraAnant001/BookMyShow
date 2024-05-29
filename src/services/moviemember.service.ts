import { IMovieMember } from "../interfaces";
import { MovieMember } from "../models";
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";

export class MovieMemberService{
    async getAllUsers(){
        const data = await MovieMember.find({})
        if(data.length==0){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"users fetched successfully")
    }

    async createUser(userdata:IMovieMember){
        const data = await MovieMember.create(userdata)
        return new ApiResponse(SuccessCodes.created,data,"user registered successfully")
    }

    async getUserById(id:string){
        const data = await MovieMember.findById(id)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"user fetched successfully")
    }
    
    async updateUser(id:string,userdata:IMovieMember){
        const data = await MovieMember.findByIdAndUpdate(id,userdata)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"user updated successfully")
    }

    async deleteUser(id:string){
        const data = await MovieMember.findByIdAndDelete(id)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,"no user found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"user deleted successfully")
    }
}