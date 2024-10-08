import { db } from "../database/db.connection.js";
import customersRepository from "../repositories/customers.repository.js";

export async function getCustomersService() {
    const customers = await customersRepository.getCustomers();
    return customers.rows;
}

export async function getCustomersByIdService(id) {
    const customer = await customersRepository.getCustomersById(id);
    if (customer.rowCount == 0) throw { type: "NOT FOUND", message: "Cliente não encontrado!" }
    return customer.rows[0];
}

export async function postCustomersService({ name, phone, cpf }) {
    const customer = await customersRepository.getCustomersByCpf(cpf);
    if (customer.rowCount > 0) throw { type: "CONFLICT CPF", message: "Já existe um cliente com esse CPF!" }
    const customers = await customersRepository.postCustomer(name, phone, cpf)

    return customers;
}