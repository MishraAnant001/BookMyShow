import { MovieMemberController } from "../controllers";
import { Router } from "express";

const controller = new MovieMemberController()
export const movieMemberRouter = Router()

movieMemberRouter.route("/").get(controller.getAllUsers).post(controller.createUser)
movieMemberRouter.route("/:id").get(controller.getUserById).put(controller.updateUser).delete(controller.deleteUser)