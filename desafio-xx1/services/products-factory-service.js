import ProductsDaoFactory from "../dao/dao-factory.js"
import ProductsRep from "../repository/products-rep.js"
import ProductsService from "./products-service.js"

const productsDAO = ProductsDaoFactory.getDao()

const productsRep = new ProductsRep(productsDAO)

const productService = new ProductsService(productsRep)

export default productService