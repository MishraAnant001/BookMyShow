import { IMovie } from "../interfaces";
import { Movie } from "../models";
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";

export class MovieService {
    async getAllMovies(userid?: string, role?: string) {
        let data = null
        if (role == "director") {
            data = await Movie.find({ director: userid })
        } else {
            data = await Movie.find({})
        }
        if (data.length == 0) {
            throw new ApiError(ErrorCodes.notFound, "No movies found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "movies fetched successfully")
    }

    async createMovie(moviedata:IMovie,userid?:string){
        moviedata.director=userid
        const data = await Movie.create(moviedata)
        return new ApiResponse(SuccessCodes.created, data, "movie added successfully")
    }

    async updateMovie(movieid:string,moviedata:IMovie){
        const data = await Movie.findByIdAndUpdate(movieid,moviedata)
        if(!data){
            throw new ApiError(ErrorCodes.notFound, "No movie found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "movie updated successfully")

    }
    async deleteMovie(movieid:string){
        const data = await Movie.findByIdAndDelete(movieid)
        if(!data){
            throw new ApiError(ErrorCodes.notFound, "No movie found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "movie deleted successfully")

    }
}