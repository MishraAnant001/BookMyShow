import { UserController } from "../controllers";
import { Router } from "express";

const controller = new UserController()
export const userRouter = Router()

userRouter.route("/").get(controller.getAllUsers).post(controller.createUser)
userRouter.route("/:id").get(controller.getUserById).put(controller.updateUser).delete(controller.deleteUser)