import { Router } from 'express'
import { isAuth } from '../auth/auth.js'
import { createCart , getCart, getCarts, deleteCart, addProduct, removeProduct } from '../controllers/carts-controller.js'

const router = Router()

router.get('/', isAuth, getCarts )
router.get('/:id', isAuth, getCart)
router.post('/', isAuth, createCart)
router.delete('/:id', isAuth, deleteCart)

router.post('/:id', isAuth, addProduct)
router.post('/:idCart/:idProduct', isAuth, removeProduct)




export default router