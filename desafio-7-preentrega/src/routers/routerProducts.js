//-----------------------REQUIRES / IMPORTS-----------------------//
const express = require('express');
const { Router } = express;
const Container = require('../handlers/productClass')


const routerProducts = new Router();
const dataProducts = new Container('products')

//-----------------------ADMIN ROUTE CONFIGURATION-----------------------//
const administrator = true;

function adminVerification(req,res,next){
  if(administrator){
    next();
  }else{
    res.sendStatus(403)
  }
}
//-----------------------ROUTE /api/products-----------------------//

//------------Get Handler------------//
routerProducts.get('/', async (req,res)=>{
    res.send(await dataProducts.getAll())
})

//------------Post Handler------------//
routerProducts.post('/', (req,res)=>{
    const newProduct = req.body
    res.send(dataProducts.add(newProduct))
})

//-----------------------ROUTE /api/products/:id-----------------------//

//------------Get Handler------------//
routerProducts.get('/:id', async (req,res)=>{
    let id = req.params.id;
    res.send(await dataProducts.getById(id))
})

//------------Put Handler------------//
routerProducts.put('/:id', adminVerification, async (req,res)=>{
    let id = req.params.id;
    const editedProduct = req.body;
    res.send(dataProducts.edit(id, editedProduct))
})

//------------Delete Handler------------//
routerProducts.delete('/:id', adminVerification, (req,res)=>{
    let id = req.params.id;
    res.send(dataProducts.deleteById(id))
} )

//-----------------------EXPORTS-----------------------//
module.exports = routerProducts;