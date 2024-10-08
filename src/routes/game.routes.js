import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controller.js";
import { gameSchema } from "../schemas/game.schema.js";
import { validateSchema } from "../middlewares/validateschema.middleaware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validateSchema(gameSchema), postGames)

export default gamesRouter