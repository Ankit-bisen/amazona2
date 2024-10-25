import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    isAdmin: { type: Boolean, default: false }

}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)

export default userModel