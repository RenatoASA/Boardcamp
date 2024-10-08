import { getCustomersByIdService, getCustomersService, postCustomersService } from "../services/customers.services.js";

export async function getCustomers(req, res) {
        const customers = await getCustomersService();
        return res.send(customers);
}

export async function getCustomersById(req, res) {
    const { id } = req.params;
        const customer = await getCustomersByIdService(id);
        return res.status(200).send(customer);
}

export async function postCustomers(req, res) {
        await postCustomersService(req.body);
        return res.status(201).send("CREATED")
}