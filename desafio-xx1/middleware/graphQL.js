import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/products-controller.js";

const schema = buildSchema(`
  input ProductInput {
    name: String
    description: String
    category: String
    image: String
    code: String
    price: Int 
    stock: Int
  }
  type Product {
    id: ID!
    name: String
    description: String
    category: String
    image: String
    code: String
    price: Int 
    stock: Int
  }
  type Query {
    getProduct(id: ID!): Product
    getProducts(campo: String, valor: String): [Product]
  }
  type Mutation {
    createProduct(data: ProductInput!): Product
    updateProduct(id: ID!, datos: ProductInput!): Product
    deleteProduct(id: ID!): Product
  }
`);

export const graphqlMiddleware = graphqlHTTP({
    schema,
    rootValue: {
        createProduct,
        getProducts,
        getProduct,
        updateProduct,
        deleteProduct,
    },
    graphiql: true,
});
