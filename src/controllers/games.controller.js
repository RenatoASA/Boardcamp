import { getGamesService, postGamesService } from "../services/games.services.js"

export async function getGames(req, res) {
        const result = await getGamesService();
        res.status(200).send(result)
}

export async function postGames(req, res) {
        await postGamesService(req.body)
        return res.sendStatus(201);
}