import mongoose from "mongoose"

const usersSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    adress: String,
    age: String,
    phone: String,
    avatar: String
})


const Users = mongoose.model('User', usersSchema)

export default Users