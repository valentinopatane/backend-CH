export default class ProductsService {
    #rep;
    constructor(productsRep) {
        this.#rep = productsRep;
    }

    async createProduct(product) {
        try {
            const newProduct = await this.#rep.add(product);
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(campo, valor) {
        try {
            const products = await this.#rep.getAll();

            if (campo && valor) {
                return products.filter((p) => p[campo] == valor);
            } else {
                return products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProduct(id) {
        try {
            const productFound = await this.#rep.getById(id);
            return productFound;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, newProduct) {
        try {
            const updatedProduct = await this.#rep.update(id, newProduct);
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await this.#rep.delete(id);
            return deleteProduct;
        } catch (error) {
            console.log(error);
        }
    }
}
