import { TheatreController } from "../controllers";
import { Router } from "express";
import { Authentication } from "../middlewares";
const auth = new Authentication()
const controller = new TheatreController()
export const theatreRouter = Router()

theatreRouter.route("/").get(auth.authenticateAll,controller.getAllTheatres).post(auth.authenticateTheatreAdmin,controller.createTheatre)
theatreRouter.route("/:id").put(auth.authenticateTheatreAdmin,controller.updateTheatre).delete(auth.authenticateTheatreAdmin,controller.deleteTheatre)