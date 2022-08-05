import ProductsService from "../services/products-factory-service.js"

export async function createProduct (req,res) {
    try {
        const product = await ProductsService.createProduct(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export async function getProducts(req, res) {
    try {
        const products = await ProductsService.getProducts()
        res.status(200).json(products)

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error })
    }
}

export async function getProduct(req, res) {
    const { id } = req.params
    try {
        const product = await ProductsService.getProduct(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export async function updateProduct(req,res){
    const { id } = req.params
    const newData = req.body
    try {
        const updatedProduct = await ProductsService.updateProduct(id, newData)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export async function deleteProduct(req,res){
    const { id } = req.params
    try {
        const deleteProduct = await ProductsService.deleteProduct(id)
        res.json({message:`Product "${deleteProduct.name}" deleted successfully`})
    } catch (error) {
        res.status(404).json({ message: error })
    }
}



// export default class productController{
//     constructor(){
//         this.productService = 
//     }

//     async createProduct (req,res) {
//         try {
//             const product = await this.productService.createProduct(req.body)
//             res.status(201).json(product)
//         } catch (error) {
//             res.status(409).json({ message: error })
//         }
//     }

//     async getProducts(req, res) {
//         try {
//             const products = await this.productService.getProducts()
//             res.status(200).json(products)
    
//         } catch (error) {
//             console.log(error)
//             res.status(404).json({ message: error })
//         }
//     }

//     async getProduct(req, res) {
//         const { id } = req.params
//         try {
//             const product = await this.productService.getProduct(id)
//             res.status(200).json(product)
    
//         } catch (error) {
//             res.status(404).json({ message: error })
//         }
//     }

//     async updateProduct(req,res){
//         const { id } = req.params
//         const newData = req.body

//         try {
//             const updatedProduct = await this.productService.updateProduct(id, newData)
//             res.status(200).json(updatedProduct)

//         } catch (error) {
//             res.status(404).json({ message: error })
//         }
//     }

//     async deleteProduct(req,res){
//         const { id } = req.params
//         try {
//             const deleteProduct = await this.productService.deleteProduct(id)
//             res.json({message:`Product "${deleteProduct.name}" deleted successfully`})
//         } catch (error) {
//             res.status(404).json({ message: error })
//         }
//     }
// }
