import express from 'express'
import Order from '../models/orderModel.js'
import { isAuth } from '../utils.js'
import expressAsyncHandler from 'express-async-handler'

const orderRoutes = express.Router()

orderRoutes.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const neworder = await Order({
            orderItem: req.body.orderItem.map((x) => ({ ...x, product: x._id })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemPrice: req.body.itemPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })
        const order = await neworder.save()
        res.status(201).json({ massage: "order created successfully", order })

    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "order created api error", error })
    }



}))
orderRoutes.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.find({ user: req.user._id })
        res.send(order)

    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "order not find", error })
    }



}))



orderRoutes.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        res.status(201).json({ massage: "order finded successfully", order })

    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "order not find", error })
    }



}))


orderRoutes.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            }
        }
        const updateOrder = await order.save()
        res.status(201).json({ massage: "order paid", order: updateOrder })

    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "order not paid", error })
    }



}))

export default orderRoutes