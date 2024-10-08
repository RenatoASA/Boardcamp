import { db } from "../database/db.connection.js";
import gamesRepository from "../repositories/games.repository.js";

export async function getGamesService() {
    const games = await gamesRepository.getGames();
    return games.rows;
}

export async function postGamesService({ name, image, stockTotal, pricePerDay }) {
    const conflict = await gamesRepository.getGamesByName(name);
    if (conflict.rowCount > 0) throw { type: "CONFLICT", message: "Ja existe um game com esse nome" }
    if (stockTotal < 0 || pricePerDay < 0) throw { type: "greaterThan0", message: "O total do estoque e o preço por dia deve ser maior que 0!" }
    const result = await gamesRepository.postGame(name, image, stockTotal, pricePerDay);
    return result;
}