import { db } from "../database/db.connection.js";
import rentalsRepository from "../repositories/rentals.repository.js";
import gamesRepository from "../repositories/games.repository.js";
import customersRepository from "../repositories/customers.repository.js";

export async function getRentalsService() {
    const getRentalsFormatted = await rentalsRepository.getRentalsJoin()
    return getRentalsFormatted;

}

export async function postRentalsService({ customerId, gameId, daysRented }) {

    const contain = await gamesRepository.getGamesById(gameId);
    if (contain.rows <= 0) throw { type: "GAME NOT FOUND", message: "Jogo não encontrado!" }

    const stockGame = await gamesRepository.getStockGame(gameId);
    const rentalsGame = await rentalsRepository.getRentalsGames(gameId);
    const stockTotal = stockGame.rows[0].stockTotal;
    const rentalsCount = rentalsGame.rows[0].count;

    if (rentalsCount >= stockTotal) throw { type: "NO STOCK GAME", message: "Não tem esse jogo em estoque!" };

    const containCustomer = await customersRepository.getCustomerById(customerId);
    if (containCustomer.rows <= 0) throw { type: "GAME NOT FOUND", message: "Cliente não encontrado!" }

    if (daysRented <= 0) throw { type: "greaterThan0", message: "A quantidade de dias alugados deve ser maior que 0!" }

    const rentDate = new Date().toISOString().split('T')[0];
    const originalPrice = daysRented * 35000;
    const returnDate = null;
    const delayFee = null;

    const result = await rentalsRepository.postRentals(customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee)
    return result;
}

export async function postRentalsIdReturnService(id) {

    const getReturnRental = await rentalsRepository.getRentalsById(id);
    if (getReturnRental.rowCount === 0) throw { type: "RENTALS NOT FOUND", message: "Este aluguel não existe!" }

    const rental = getReturnRental.rows[0];

    if (rental.returnDate !== null) throw { type: "RENTALS FINALIZED", message: "Este aluguel ja foi finalizado!" }



    const returnDate = new Date().toISOString().split('T')[0];

    const rentDate = new Date(rental.rentDate);
    const daysRented = rental.daysRented;
    const expectedReturnDate = new Date(rentDate);
    expectedReturnDate.setDate(rentDate.getDate() + daysRented);


    const currentDate = new Date(returnDate);
    const delayDays = Math.max(0, Math.ceil((currentDate - expectedReturnDate) / (1000 * 60 * 60 * 24)));


    let delayFee = 0;
    if (delayDays > 0) {
        const pricePerDay = rental.originalPrice / rental.daysRented;
        delayFee = delayDays * pricePerDay;
    }

    const result = await rentalsRepository.postRentalsIdReturnUpdate(delayFee, returnDate, id);

    return result;  
}

export async function deleteRentalsService(id) {

    const getDeleteRental = await rentalsRepository.getDeleteReturnById(id);
    if (getDeleteRental.rowCount === 0) throw { type: "RENTALS DELETE NOT FOUND", message: "Este aluguel não existe!" }

    const getRental = await rentalsRepository.getRentalsById(id);
    const rental = getRental.rows[0];

    if (rental.returnDate == null) throw { type: "RENTALS NOT FINALIZED", message: "Este aluguel ainda não foi finalizado!" }

    const result = await rentalsRepository.deleteRentals(id);
    return result;
}