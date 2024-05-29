import { Router } from "express";
import { userRouter } from "./user.route";
import { loginRouter } from "./login.route";
import { signupRouter } from "./signup.route";
import { movieMemberRouter } from "./moviemember.route";

export const mainRouter = Router()

mainRouter.use("/api/v1/users",userRouter)
mainRouter.use("/api/v1/login",loginRouter)
mainRouter.use("/api/v1/signup",signupRouter)
mainRouter.use("/api/v1/moviemember",movieMemberRouter)