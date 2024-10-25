import mongoose from "mongoose";


const ProductSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    Description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, requred: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true }
}, { timestamps: true })

const productModel = mongoose.model("products", ProductSchema)

export default productModel