
import bcrypt from 'bcryptjs'
export const data = {
    user: [
        {
            name:"ankit",
            email:"ankit@123gmail.com",
            password:bcrypt.hashSync("123456"),
            isAdmin:true
        },
        {
            name:"aman",
            email:"aman@123gmail.com",
            password:bcrypt.hashSync("123456"),
            isAdmin:false
        }
    ],
    products: [
        {
            // _id: "1",
            name: "Nike Slim Shirt",
            slug: "Nike-Slim-Shirt",
            category: "Shirt",
            brand: "Nike",
            image: "/image/p1.jpg",
            price: 70,
            countInStock: 0,
            rating: 3.5,
            numReviews: 10,
            Description: "top quality product by Nike"
        },
        {
            // _id: "2",

            name: "Adidas Slim Shirt",
            slug: "Adidas-Slim-Shirt",
            category: "Shirt",
            brand: "addidas",
            image: "/image/p3.jpg",
            price: 170,
            countInStock: 10,
            rating: 4.5,
            numReviews: 10,
            Description: "top quality product by Adidas"
        },
        {
            // _id: "3",
            name: "Nike Slim Pant",
            slug: "Nike-Slim-Pant",
            brand: "Nike"
            , category: "Pant",
            image: "/image/p2.jpg",
            price: 60,
            countInStock: 10,
            rating: 2.5,
            numReviews: 10,
            Description: "top quality product by Nike"
        },

        {
            // _id: "4",
            name: "Adidas Fit Pant",
            slug: "Adidas-Fit-Pant",
            brand: "addidas",
            category: "Pant",
            image: "/image/p4.jpg",
            price: 100,
            countInStock: 10,
            rating: 5,
            numReviews: 10,
            Description: "top quality product by Adidas"
        },
    ]
}