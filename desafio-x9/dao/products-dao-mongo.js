import Products from "../database/products-schema.js";

export default class ProductsDAO {

    constructor() {}

    async add(product){
        await product.save()
        return product
    }

    async getAll() {
        try {
            const products = await Products.find();
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            const productFound = await Products.findById(id)
            return productFound
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, newData){
        try {
            const updatedProduct = await Products.findByIdAndUpdate(id, { ...newData, id }, { new: true })
            return updatedProduct
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        try {
            const deletedProduct = await Products.deleteOne(id)
            return deletedProduct
        } catch (error) {
            console.log(error)
        }
    }
}

































    // async findById(id) {
    //     let message = await Message.findById(id);
    //     return new MessageDTO(message);
    // }

    // async create(data) {
    //     return await Message.create(data);
    // }

    // async update(id, toUpdate) {
    //     return await Message.findByIdAndUpdate(id, toUpdate);
    // }

    // async remove(id) {
    //     return await Message.findByIdAndDelete(id);
    // }