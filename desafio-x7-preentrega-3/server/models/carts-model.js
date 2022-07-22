import mongoose from "mongoose"

const cartsSchema = mongoose.Schema({
    productsAdded: [Object]
})

const Carts = mongoose.model('Cart', cartsSchema)

export default Carts