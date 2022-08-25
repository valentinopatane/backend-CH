export default class ProductModel {
    #id;
    #name;
    #description;
    #category;
    #code;
    #image;
    #price;
    #stock;

    constructor(id, name, description, category, code, image, price, stock) {
        this.#id = id;
        this.#name = name,
        this.#description = description,
        this.#category = category,
        this.#code = code,
        this.#image = image,
        this.#price = price,
        this.#stock = stock
    }

    datos() {
        const product = Object.freeze({
            id: this.#id,
            stock: this.#stock,
            name: this.#name,
            description: this.#description,
            category: this.#category,
            code: this.#code,
            image: this.#image,
            price: this.#price,
            stock: this.#stock
        });

        const isEmpty = Object.values(product).every(value => (value === null || value === ''));

        if (isEmpty === true){
            throw new Error('Some of the fields are empty')
        }else{
            return product
        } 
    }
}