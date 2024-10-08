    export default function errorHandler(error, req, res, next){
    
    if (error.type === "CONFLICT CPF") {
        return res.status(409).send(error.message)
    }
    if (error.type === "NOT FOUND") {
        return res.status(404).send(error.message)
    }
    if (error.type === "greaterThan0") {
        return res.status(400).send(error.message)
    }
    if (error.type === "CONFLICT") {
        return res.status(409).send(error.message)
    }
    if (error.type === "greaterThan0") {
        return res.status(400).send(error.message)
    }
    if (error.type === "GAME NOT FOUND") {
        return res.status(404).send(error.message)
    }
    if (error.type === "NO STOCK GAME") {
        return res.status(422).send(error.message)
    }
    if (error.type === "RENTALS NOT FOUND") {
        return res.status(404).send(error.message)
    }
    if (error.type === "RENTALS FINALIZED") {
        return res.status(422).send(error.message)
    }
    if (error.type === "RENTALS DELETE NOT FOUND") {
        return res.status(404).send(error.message)
    }
    if (error.type === "RENTALS NOT FINALIZED") {
        return res.status(400).send(error.message)
    }
    if (error.type === "RENTALS DELETE NOT FOUND") {
        return res.status(404).send(error.message)
    }
    if (error) {
        return res.status(500).send(error.message)
    }
}