import mongoose from "mongoose"

const ordersSchema = mongoose.Schema({
    user: {
        email: String,
        name: String,
        adress: String,
        age: String,
        phone: String
    },
    order: [Object]
})

const Orders = mongoose.model('Order', ordersSchema)

export default Orders