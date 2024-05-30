import { Booking, MovieTiming } from "../models";
import { Ibooking } from "../interfaces";
import { ApiError, ErrorCodes, ApiResponse, SuccessCodes } from "../utils";

export class BookingService {
    async getAllBookings(userid?: string, role?: string) {
        if (role !== "user" && role !== "superadmin") {
            throw new ApiError(ErrorCodes.unauthorized, "only admins and users are allowed!")
        }
        let data = null;
        if (role === "user") {
            data = await Booking.find({ user: userid })
        } else {
            data = await Booking.find({})
        }
        if (data.length == 0) {
            throw new ApiError(ErrorCodes.notFound, "No booking found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "bookings fetched successfully")
    }

    async createbooking(bookingdata: Ibooking, userid?: string) {
        if (userid) {

            bookingdata.user = userid
        }
        const movietiming = await MovieTiming.findById(bookingdata.movie_timing)
        if (movietiming) {
            const available_seats = movietiming?.available_seats
            if (available_seats && bookingdata.num_of_tickets > available_seats) {
                throw new ApiError(ErrorCodes.badRequest, "required seats are not available!")
            }
            movietiming.available_seats = available_seats - bookingdata.num_of_tickets
            await movietiming.save()
        }
        const data = await Booking.create(bookingdata)
        return new ApiResponse(SuccessCodes.created, data, "booking added successfully")
    }

    async deleteBooking(bookingid: string) {
        const booking = await Booking.findById(bookingid)
        if (!booking) {
            throw new ApiError(ErrorCodes.notFound, "No booking found")
        }
        const movietiming = await MovieTiming.findById(booking.movie_timing)
        if (movietiming) {
            movietiming.available_seats = movietiming.available_seats + booking.num_of_tickets
            await movietiming.save()
        }
        const data = await Booking.deleteOne({ _id: bookingid })
        return new ApiResponse(SuccessCodes.ok, data, "booking deleted successfully")
    }
}