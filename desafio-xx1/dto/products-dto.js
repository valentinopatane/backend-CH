export default class ProductsDTO {
    constructor(productData) {
        this.id = productData.id;
        this.name = productData.name;
        this.description = productData.description;
        this.category = productData.category;
        this.image = productData.image;
        this.price = productData.price;
        this.stock = productData.stock;
    }
}

export function asDto(dataP) {
    if (Array.isArray(dataP)) return dataP.map((p) => new ProductsDTO(p));
    else return new ProductsDTO(dataP);
}
