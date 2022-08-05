import mongoose from "mongoose"

const productsSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    code: String,
    image: String,
    price: Number,
    stock: Number
})


const Products = mongoose.model('Product', productsSchema)

export default Products