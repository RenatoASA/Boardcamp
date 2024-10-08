import { db } from "../database/db.connection.js";

async function getGames() {
    const games = await db.query(`SELECT * FROM games;`)
    return games;
}

async function getGamesByName(name) {
    const conflict = await db.query(`SELECT * FROM games   where name= $1;`, [name])
    return conflict;
}
async function getGamesById(gameId) {
    const contain = await db.query(`SELECT * FROM games   where id= $1;`, [gameId])
    return contain;
}

async function getStockGame(gameId) {
    const stockGame = await db.query(`select "stockTotal" from games where id = $1;`, [gameId])
    return stockGame;
}

async function postGame(name, image, stockTotal, pricePerDay) {
    const result = await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
                        VALUES($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])
    return result;
}

const gamesRepository = {
    getGames,
    postGame,
    getGamesByName,
    getGamesById,
    getStockGame
}

export default gamesRepository;