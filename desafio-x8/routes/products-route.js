import { Router } from 'express'
import { getProducts, getProduct, createProduct, updateProduct,deleteProduct  } from '../controllers/products-controller.js'
import { isAuth } from '../auth/auth.js'


const router = Router()

router.get('/', getProducts)
router.get('/:id', isAuth, getProduct)
router.post('/', isAuth, createProduct )
router.patch('/:id', isAuth, updateProduct)
router.delete('/:id', isAuth, deleteProduct )


export default router