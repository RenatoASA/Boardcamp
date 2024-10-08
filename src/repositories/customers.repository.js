import { db } from "../database/db.connection.js";

async function getCustomers() {
    const customers = await db.query(`SELECT * FROM customers;`)
    return customers;
}

async function getCustomersById(id) {
    const customer = await db.query(`SELECT * FROM customers   where id= $1;`, [id])
    return customer;
}

async function getCustomersByCpf(cpf) {
    const conflict = await db.query(`SELECT * FROM customers   where cpf= $1;`, [cpf])
    return conflict;
}

async function getCustomerById(customerId) {
    const contain = await db.query(`SELECT * FROM customers   where id= $1;`, [customerId])
    return contain;
}

async function postCustomer(name, phone, cpf) {
    const customers = await db.query(`INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3);`, [name, phone, cpf]);
    return customers;
}

const customersRepository = {
    getCustomers,
    getCustomersById,
    postCustomer,
    getCustomersByCpf,
    getCustomerById
}

export default customersRepository;