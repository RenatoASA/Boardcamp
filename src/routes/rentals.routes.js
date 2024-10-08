import { Router } from "express";
import { getRentals, postRentals, postRentalsIdReturn, deleteRentals} from "../controllers/rentals.controller.js";
import { rentalsSchema } from "../schemas/rentals.schema.js";
import { validateSchema } from "../middlewares/validateschema.middleaware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchema(rentalsSchema),postRentals)
rentalsRouter.post("/rentals/:id/return", postRentalsIdReturn)
rentalsRouter.delete("/rentals/:id", deleteRentals)

export default rentalsRouter