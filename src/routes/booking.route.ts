import { BookingController } from "../controllers";
import { Router } from "express";
import { Authentication } from "../middlewares";
const auth = new Authentication()
const controller = new BookingController()
export const bookingRouter = Router()

bookingRouter.route("/").get(auth.authenticateAll,controller.getAllbookings).post(auth.authenticateUser,controller.createbooking)
bookingRouter.route("/:id").delete(auth.authenticateUser,controller.deleteBooking)