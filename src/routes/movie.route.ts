import { MovieController } from "../controllers";
import { Router } from "express";
import { Authentication } from "../middlewares";
const auth = new Authentication()
const controller = new MovieController()
export const movieRouter = Router()
movieRouter.route("/").get(auth.authenticateAll,controller.getAllMovies).post(auth.authenticateDirector,controller.createMovie)
movieRouter.route("/:id").put(auth.authenticateDirector,controller.updateMovie).delete(auth.authenticateDirector,controller.deleteMovie)