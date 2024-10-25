import mongoose from "mongoose";


const orderSchema = mongoose.Schema({

    orderItem: [
        {
            name: { type: String, required: true },
            slug: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            }
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String },
        country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    itemPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },


}, { timestamps: true })

const Order = mongoose.model("order", orderSchema)

export default Order