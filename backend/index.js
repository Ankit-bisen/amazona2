import express from 'express'
import { data } from './data.js'
import cors from 'cors';
import mongoose from 'mongoose';
import env from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


env.config()

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("db connected successfully")
    }).catch((err) => {
        console.log("mongodb error", err)
    })
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // If you need to send cookies or authentication headers
}));
app.use(express.json())

app.use('/api/seed', seedRouter)
app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders',orderRoutes)

app.use('/api/keys/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID ||'sb')
})

// or to allow specific origins
// app.use(cors({ origin: 'http://localhost:3000' }));/

app.use((err, req, res, next) => {
    res.status(500).send({ massage: err.massage })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`serve at http://localhost:${PORT}`)
})






