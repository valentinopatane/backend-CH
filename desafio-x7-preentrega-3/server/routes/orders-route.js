import { Router } from 'express'
import { isAuth } from '../auth/auth.js'
import { getOrders, addOrder, deleteOrder,getOrder  } from '../controllers/orders-controller.js'

const router = Router()

router.get('/', isAuth, getOrders)
router.post('/', isAuth, addOrder)
router.get('/:id', isAuth, getOrder)
router.delete('/:id', isAuth, deleteOrder)

export default router