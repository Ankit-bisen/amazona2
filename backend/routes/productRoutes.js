import express, { query } from 'express'
import productModel from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'

const productRoutes = express.Router()

productRoutes.get('/', async (req, res) => {
    const products = await productModel.find({})
    res.status(200).json(products)
})

productRoutes.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await productModel.find().distinct('category')
    res.send(categories)
}))
const PAGE_SIZE = 3
productRoutes.get('/search', expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE
    const page = query.page || 1
    const category = query.category || ''
    const brand = query.brand || ''
    const price = query.price || ''
    const rating = query.rating || ''
    const order = query.order || ''
    const searchQuery = query.query || ''

    const queryFilter =
        searchQuery && searchQuery !== "all"
            ?
            {
                name: {
                    $regex: searchQuery,
                    $options: "i"
                }
            } : {}
    const categoryFilter = category && category !== "all" ? { category } : {}
    const ratingFilter = rating && rating !== "all"
        ? {
            rating: {
                $gte: Number((rating))
            },
        }
        : {}

    const priceFilter =
        price && price !== "all"
            ? {
                price: {
                    $gte: Number(price.split('-'[0])),
                    $lte: Number(price.split('-'[1]))
                }
            } : {}
    const sortOrder =
        order === 'featured'
            ? { featured: -1 }
            : order === 'lowest'
                ? { price: 1 }
                : order === "highest"
                    ? { price: -1 }
                    : order === "toprated"
                        ? { rating: -1 }
                        : order === 'newest'
                            ? { createdAt: -1 }
                            : { _id: -1 };


    const products = await productModel.find({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    })
        .sort(sortOrder)
        .skip(pageSize * (page - 1))
        .limit(pageSize)

    const countProducts = await productModel.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    })
    res.send(
        {
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / page)
        }
    )
}))


productRoutes.get('/slug/:slug', async (req, res) => {


    const product = await productModel.findOne({ slug: req.params.slug })
    if (product) {
        res.send(product)
    } else {

        res.status(404).json({ massage: "product not find" })
    }
    // res.send(data.products)

})

productRoutes.get('/:id', async (req, res) => {

    const product = await productModel.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {

        res.status(404).json({ massage: "product not find" })
    }
    // res.send(data.products)

})



export default productRoutes