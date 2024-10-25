import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import env from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent

env.config()

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("db connected successfully")
    }).catch((err) => {
        console.log("mongodb error", err)
    })
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json())

app.use('/api/seed', seedRouter)
app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)

app.use('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use(express.static(path.join(__dirname, "../", "frontend", 'build')));

// Catch-all handler for any requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../", "frontend", 'build', 'index.html'));
});
// or to allow specific origins
// app.use(cors({ origin: 'http://localhost:3000' }));/

app.use((err, req, res, next) => {
    res.status(500).send({ massage: err.massage })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`serve at http://localhost:${PORT}`)
})






