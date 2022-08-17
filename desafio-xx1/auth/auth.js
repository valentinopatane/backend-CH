import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const isAuth = (req, res, next) => {

    const data = req.headers.authorization

    try {

        if(data === undefined){
            return res.status(403).json({ message:"You haven't logged in" })
        }

        const token = req.headers.authorization.split(" ")[1]

        let decodedData;

        if(token){
            decodedData = jwt.verify(token, process.env.TOKEN_SS_WORD)

            req.userId = decodedData.id
        }else{
            decodedData = jwt.decode(token)
            req.userId = decodedData.sub
        }

        next()

    } catch (error) {
        console.log(error)
    }
}