import Orders from "../models/orders-model.js"
import mongoose from "mongoose"


export const getOrders = async (req, res) => {
    try {
        const orders = await Orders.find()

        res.status(200).json(orders)
        
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const addOrder = async (req, res) => {
    const { user, order } = req.body
    const newOrder = new Orders({
        user: user, 
        order: order
    })
    try {
        await newOrder.save()
        res.status(201).json(newOrder);

    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const getOrder = async (req, res) => {
    const { id } = req.params

    try {
        const order = await Orders.findById(id)
        res.status(200).json(order)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const deleteOrder = async (req, res) => {
    const { id: _id  } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Cart not found')

        await Orders.deleteOne({ _id })

        res.json({message:'Order deleted successfully'})

    } catch (error) {
        res.status(404).json({ message: error })
    }
}