import { Router } from 'express';
import { productsDAO } from '../daos/products/productsDAO'

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    const productos = await productsDAO.getAll()
    res.json(productos)
})

productsRouter.get('/:id', async (req, res) => {
    const productos = await productsDAO.getById(req.params.id);
    res.json(productos)
})

productsRouter.post('/', async (req, res) => {
    const prodAgregado = await productsDAO.add(req.body);
    res.json(prodAgregado)
})

productsRouter.put('/:id', async (req, res) => {
    const prodActualizado = await productsDAO.edit(req.body);
    res.json(prodActualizado)
})

productsRouter.delete('/:id', async (req, res) => {
    const prodEliminado = await productsDAO.deleteById(req.params.id);
    res.json(prodEliminado)
})

export { productsRouter }