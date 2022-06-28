import { Router } from "express";

const randomRouter = Router()

randomRouter.get('/', (req, res) => {
    let miURL = new URL(`http://127.0.0.1:8080${req.url}`)
    let num = miURL.searchParams.get('cant')

    if(num === null){
        num = 100000000
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    res.send(JSON.stringify(getRandomInt(num)))
})

export default randomRouter