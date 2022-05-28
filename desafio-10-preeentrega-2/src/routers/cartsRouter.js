import { Router } from 'express'
import { cartsDAO } from '../daos/carts/cartsDAO'
import { productsDAO } from '../daos/products/productsDAO'

const cartsRouter = new Router()

//Show carts
cartsRouter.get('/', async (req, res) => {
    const carts = await cartsDAO.getAll()
    res.json(carts)
})

// Get Cart by ID
cartsRouter.get('/:id', async (req, res) => {
    const cartFound = await cartsDAO.getById(req.params.id);
    res.json(cartFound)
})

// Individual Cart Product List
cartsRouter.get('/:id/products', async (req, res) => {
    const cartFound = await cartsDAO.getById(req.params.id);
    res.json(cartFound.products)
})

// Create New Cart
cartsRouter.post('/', async (req, res) => {
    const newCart = await cartsDAO.add(req.body);
    res.json(newCart)
})

// Add Product to Cart
cartsRouter.post('/:id/products/:id_prod', async (req, res) => {
    try{
        const cartId = req.params.id
        const prodId = req.params.id_prod
    
        const cartFound = await cartsDAO.getById(cartId)
        const productFound = await productsDAO.getById(prodId)
    
        await cartsDAO.addInto(cartFound.id, productFound)
        const updatedCart = await cartsDAO.getById(cartId)

        res.json(updatedCart)

    }catch(error){
        console.log(`Error: ${error}`)
    }
})

// Delete Product from Cart
cartsRouter.delete('/:id/products/:id_prod', async (req, res) => {
    try{
        const cartId = req.params.id
        const prodId = req.params.id_prod
    
        const cartFound = await cartsDAO.getById(cartId)
        const productFound = await productsDAO.getById(prodId)
    
        await cartsDAO.removeFrom(cartFound.id, productFound.id)
        const updatedCart = await cartsDAO.getById(cartId)

        res.json(updatedCart)

    }catch(error){
        console.log(`Error: ${error}`)
    }
})

// Empty Cart
cartsRouter.delete('/:id', async (req, res) => {
    try {
      const cartId = req.params.id
      const cartFound = await cartsDAO.getById(cartId)

      if (!cartFound) {
        res.send({ error: 'Cart not found.' })
      } else {
        await cartsDAO.emptyContainer(cartId)
        const updatedCart = await cartsDAO.getById(cartId)
        res.json(updatedCart)
      }
    } catch (error) {
      console.log(`Error: ${error}`)
    }})


export default cartsRouter