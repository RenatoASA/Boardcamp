import { db } from "../database/db.connection.js";

export async function getRentalsJoin() {
    const result = await db.query(`
        SELECT r.*, 
               c.id AS "customerId", 
               c.name AS "customerName", 
               g.id AS "gameId", 
               g.name AS "gameName" 
        FROM rentals r 
        JOIN customers c ON c.id = r."customerId" 
        JOIN games g ON g.id = r."gameId";
      `);

    const rentalsFormatted = result.rows.map(rental => ({
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: new Date(rental.rentDate).toISOString().split('T')[0],
        daysRented: rental.daysRented,
        returnDate: rental.returnDate ? new Date(rental.returnDate).toISOString().split('T')[0] : null,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: {
            id: rental.customerId,
            name: rental.customerName
        },
        game: {
            id: rental.gameId,
            name: rental.gameName
        }
    }));
    return rentalsFormatted;

}

async function postRentals(customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee) {
    const result = await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
                        VALUES($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
    return result;
}

async function getRentalsGames(gameId) {
    const rentalsGame = await db.query(`select count("gameId")from rentals where "gameId" = $1 and "returnDate" is null;`, [gameId])
    return rentalsGame;
}

async function getRentalsById(id) {
    const getReturnRental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    return getReturnRental;
}

async function postRentalsIdReturnUpdate(delayFee, returnDate, id) {
    const result = await db.query(`UPDATE rentals SET "delayFee" = $1, "returnDate" = $2 WHERE id = $3`, [delayFee, returnDate, id]
    );
    return result;
}

async function getDeleteReturnById(id) {
    const getDeleteReturn = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    return getDeleteReturn;
}

async function deleteRentals(id) {
    const result = await db.query(`DELETE FROM rentals WHERE id = $1;`, [id])
    return result;
}

const rentalsRepository = {
    getRentalsJoin,
    postRentals,
    postRentalsIdReturnUpdate,
    deleteRentals,
    getRentalsGames,
    getRentalsById,
    getDeleteReturnById

}
export default rentalsRepository;