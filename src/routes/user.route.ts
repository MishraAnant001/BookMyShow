import { UserController } from "../controllers";
import { Router } from "express";
import { Authentication } from "../middlewares";
const auth = new Authentication()
const controller = new UserController()
export const userRouter = Router()
userRouter.use(auth.authenticateSuperAdmin)
userRouter.route("/").get(controller.getAllUsers).post(controller.createUser)
userRouter.route("/:id").get(controller.getUserById).put(controller.updateUser).delete(controller.deleteUser)