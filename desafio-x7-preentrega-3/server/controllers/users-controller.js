import Users from '../models/users-models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const register = async (req, res) => {
    const { email, password, confirmPassword, name, adress, age, phone, avatar } = req.body

    try {
        const existingUser = await Users.findOne({ email })

        if(existingUser) return res.status(400).json({ message: "User already exist." })
        if(password !== confirmPassword)return res.status(400).json({ message: "Passwords doesn't match." })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await Users.create({ email, password: hashedPassword, name, adress, age, phone, avatar })

        const token = jwt.sign({ email: result.email, id: result._id}, process.env.TOKEN_SS_WORD, { expiresIn: "1h" })


        res.status(200).json({ result: result, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong: ' + error })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await Users.findOne({ email })
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({ message:"Invalid password" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.TOKEN_SS_WORD, { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token})
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong: ' + error })
    }
}
