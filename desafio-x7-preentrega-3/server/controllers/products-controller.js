import Products from '../models/products-model.js'
import mongoose from 'mongoose'

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find()

        res.status(200).json(products)
        
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await Products.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createProduct = async (req, res) => {
    const product = req.body
    const newProduct = new Products({...product})

    try {
        await newProduct.save()
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const updateProduct = async (req, res) => {
    const { id: _id } = req.params
    const newData = req.body

    try {

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Post not found')

        const updatedProduct = await Products.findByIdAndUpdate(_id, {...newData, _id}, { new: true })

        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteProduct = async (req, res) => {
    const { id:_id } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Post not found')

        await Products.deleteOne({ _id })

        res.json({message:'Post deleted successfully'})

    } catch (error) {
        res.status(404).json({ message: error })
    }
    
}