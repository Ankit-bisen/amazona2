import express from 'express'
import productModel from '../models/productModel.js'
import { data } from '../data.js'
import userModel from '../models/userModel.js'

const seedRouter = express.Router()


seedRouter.get('/', async (req, res) => {
    // await productModel.remove({})
    try {
        const createProduct = await productModel.insertMany(data.products)
        const createUser = await userModel.insertMany(data.user)
        res.send(createProduct, createUser)

    } catch (error) {
        console.log(error)
    }

})



export default seedRouter