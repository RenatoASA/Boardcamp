
import { getRentalsService, postRentalsService, postRentalsIdReturnService, deleteRentalsService } from "../services/rentals.services.js";

export async function getRentals(req, res) {
        const result = await getRentalsService();
        res.status(200).send(result);
}

export async function postRentals(req, res) {
        await postRentalsService(req.body)
        return res.status(201).send("CREATED");
}

export async function postRentalsIdReturn(req, res) {
    const { id } = req.params;
    await postRentalsIdReturnService(id);
    return res.sendStatus(200);
    }

export async function deleteRentals(req, res) {
    const { id } = req.params;
    const rentals = await deleteRentalsService(id);
    return res.status(200).send("OK");
}