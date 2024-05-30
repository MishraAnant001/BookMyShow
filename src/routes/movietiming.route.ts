import { MovieTimingController } from "../controllers";
import { Router } from "express";
import { Authentication } from "../middlewares";
const auth = new Authentication()
const controller = new MovieTimingController()
export const movietimingRouter = Router()

movietimingRouter.route("/").get(auth.authenticateAll,controller.getAllMovietimings).post(auth.authenticateTheatreAdmin,controller.createMovietiming)
movietimingRouter.route("/:id").put(auth.authenticateTheatreAdmin,controller.updateMovietiming).delete(auth.authenticateTheatreAdmin,controller.deleteMovietiming)