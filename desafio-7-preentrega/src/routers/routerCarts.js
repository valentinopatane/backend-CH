//-----------------------REQUIRES / IMPORTS-----------------------//
const express = require('express');
const { Router } = express;
const ContainerProducts = require('../handlers/productClass')
const ContainerCarts = require('../handlers/cartClass')

const routerCarts = new Router();

//---------List of products available---------//
const dataProducts = new ContainerProducts('products')
//---------List of carts---------//
const dataCarts = new ContainerProducts('carts')
//---------List of items inside carts---------//
const dataCartItems = new ContainerCarts('carts')

//-----------------------ROUTE /api/carritos-----------------------//

//------------Post Handler------------//
routerCarts.post('/', (req,res)=>{
    function createCart(){
        return {
            id:0,
            content:[]
        }
    }
    res.send(dataCarts.add(createCart())) //<--- Uses a productClass method because it matches with the way carts need to be created
})

//------------Delete Handler------------//
routerCarts.delete('/:id',(req,res)=>{
    let idCart = req.params.id
    res.send(dataCarts.deleteById(idCart))
})

//-----------------------ROUTE /api/carritos/:id/productos-----------------------//

//------------Get Handler------------//
routerCarts.get('/:id/productos', async(req,res)=>{
    let idCart = req.params.id
    res.send(await dataCartItems.getAllProductsInCart(idCart))
})

//------------Post Handler------------//
routerCarts.post('/:id/productos/:id_prod', async (req,res)=>{
    let idCart = req.params.id
    let idProduct = req.params.id_prod

    const productToAdd = await dataProducts.getById(idProduct)

    res.send(dataCartItems.addProductToCart(idCart,productToAdd))
})

//------------Delete Handler------------//
routerCarts.delete('/:id/productos/:id_prod', (req,res)=>{
    let idCart = req.params.id
    let idProduct = req.params.id_prod

    res.send(dataCartItems.deleteProductFromCart(idCart, idProduct))
})

//-----------------------EXPORTS-----------------------//
module.exports = routerCarts;