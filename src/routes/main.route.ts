import { Router } from "express";
import { userRouter } from "./user.route";
import { loginRouter } from "./login.route";
import { signupRouter } from "./signup.route";
import { movieMemberRouter } from "./moviemember.route";
import { movieRouter } from "./movie.route";
import { theatreRouter } from "./theatre.route";
import { movietimingRouter } from "./movietiming.route";
import { bookingRouter } from "./booking.route";

export const mainRouter = Router()

mainRouter.use("/api/v1/users",userRouter)
mainRouter.use("/api/v1/login",loginRouter)
mainRouter.use("/api/v1/signup",signupRouter)
mainRouter.use("/api/v1/moviemember",movieMemberRouter)
mainRouter.use("/api/v1/movie",movieRouter)
mainRouter.use("/api/v1/theatre",theatreRouter)
mainRouter.use("/api/v1/movietiming",movietimingRouter)
mainRouter.use("/api/v1/booking",bookingRouter)