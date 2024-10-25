import express from 'express'
import userModel from '../models/userModel.js'
import { genrateToken, isAuth } from '../utils.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

const userRoutes = express.Router()




userRoutes.post('/signin', expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            if (user.password && bcrypt.compareSync(password, user.password)) {
                res.send({
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: genrateToken(user)
                });
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Sign-in API error", error });
    }
}));

userRoutes.post('/signup', expressAsyncHandler(async (req, res) => {

    try {
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })

        const user = await newUser.save()

        res.send({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genrateToken(user)

        });

    } catch (error) {
        console.log("error", error)
        res.status(500).json(error)
    }

}))

userRoutes.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updateUser = await user.save()
        res.send({
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: genrateToken(updateUser)
        })
    } else {
        res.status(404).send({ massage: 'user not found' })
    }
}))



export default userRoutes