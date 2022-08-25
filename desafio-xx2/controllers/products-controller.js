import ProductsService from "../services/products-factory-service.js";

export function getPersonas({ campo, valor }) {
    return ProductsService.getProducts(campo, valor);
}

export function getPersona({ id }) {
    return ProductsService.getProduct(id);
}

export function createPersona({ datos }) {
    return ProductsService.createProduct(datos);
}

export function updatePersona({ id, datos }) {
    return ProductsService.updateProduct(id, datos);
}

export function deletePersona({ id }) {
    return ProductsService.deleteProduct(id);
}
