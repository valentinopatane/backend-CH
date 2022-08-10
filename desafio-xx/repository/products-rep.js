import { asDto } from "../dto/products-dto.js";
import Id from "../models/id-model.js";

export default class ProductsRep {
    #dao;

    constructor(dao) {
        this.#dao = dao;
    }

    async add(product) {
        const id = Id.new();
        const newProduct = new asDto({ id, ...product });
        await this.#dao.add(newProduct);
        return newProduct;
    }

    async getAll() {
        const products = await this.#dao.getAll();
        return asDto(products);
    }

    async getById(idProduct) {
        const productFound = await this.#dao.getById(idProduct);
        return new asDto(productFound);
    }

    async update(id, newData) {
        const updatedProduct = await this.#dao.update(id, newData);
        return new asDto(updatedProduct);
    }

    async delete(id) {
        const deletedProduct = await this.#dao.delete(id);
        return new asDto(deletedProduct);
    }
}
