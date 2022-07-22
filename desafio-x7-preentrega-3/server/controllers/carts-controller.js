import Carts from '../models/carts-model.js'
import mongoose from 'mongoose'

export const getCarts = async (req, res) => {
    try {
        const carts = await Carts.find()

        res.status(200).json(carts)
        
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getCart = async (req, res) => {
    const { id } = req.params

    try {
        const cart = await Carts.findById(id)
        res.status(200).json(cart)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createCart = async (req, res) => {
    const { id } = req.body
    const newCart = new Carts({
        _id: id, 
        productsAdded:[]
    })

    try {
        const existingCart = await Carts.findById(id)

        if(existingCart) return res.status(400).json({ message: "Cart already exist." })

        await newCart.save()
        res.status(201).json(newCart);

    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const deleteCart = async (req, res) => {
    const { id: _id  } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Cart not found')

        await Carts.deleteOne({ _id })

        res.json({message:'Cart deleted successfully'})

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const addProduct = async (req, res) =>{
    const { id } = req.params
    const product = req.body

    try {
        const existingCart = await Carts.findById(id)

        if(!existingCart) return res.status(400).json({ message: "Cart doesn't exist." })

        await existingCart.productsAdded.push(product)


        await Carts.findByIdAndUpdate(id, existingCart, { new: true })
        res.status(201).json(existingCart);

    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const removeProduct = async (req, res) => {
    const { idCart, idProduct } = req.params

    try {
        const existingCart = await Carts.findById(idCart)

        if(!existingCart) return res.status(400).json({ message: "Cart doesn't exist." })

        const updatedCart = existingCart.productsAdded.filter((p) => p._id !== idProduct)

        await Carts.deleteOne({idCart})

        const newCart = new Carts({
            _id: idCart, 
            productsAdded: updatedCart
        })
        await newCart.save()

        res.status(201).json(newCart);

    } catch (error) {
        res.status(409).json({ message: error })
    }
}