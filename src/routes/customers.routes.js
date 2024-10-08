import { Router } from "express";
import {getCustomers, getCustomersById, postCustomers} from "../controllers/customers.controller.js";
import { customersSchema } from "../schemas/customers.schema.js";
import { validateSchema } from "../middlewares/validateschema.middleaware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomersById)
customersRouter.post("/customers", validateSchema(customersSchema), postCustomers)

export default customersRouter