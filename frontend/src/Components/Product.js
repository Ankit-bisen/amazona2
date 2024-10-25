import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom'
import Rating from './Rating';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product }) => {
    const dispatch = useDispatch()
    const { card } = useSelector(state => state.product)

    const addToCardHandler = async (item) => {
        try {

            const existItem = card.cardItem.find((x) => x._id === product._id)
            const quantity = existItem ? existItem.quantity + 1 : 1
            const { data } = await axios.get(`https://amazona2-j8bw.onrender.com/api/product/${item._id}`)
            if (data.countInStock < quantity) {
                window.alert('sorry . product is not of stock')
                return;
            }
            dispatch({ type: "ADD_TO_CARD", payload: { ...item, quantity: quantity } })
            // navigate('/card')
        } catch (error) {
            console.log("api errorr", error)
        }
    }
    return (
        <Card className='product'>
            <NavLink to={`/product/${product.slug}`}>
                <img src={product.image} alt={[product.name]} className='card-img-top' />
            </NavLink>
            <Card.Body>
                <div className='product-info'>
                    <NavLink to={`/product/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </NavLink>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    <Card.Text> <strong>${product.price}</strong></Card.Text>
                    {product.countInStock == 0 ? <Button variant='light' disabled>out of stock</Button> :

                        <Button variant='primary'
                            onClick={() => addToCardHandler(product)}
                            style={{ backgroundColor: "#f0c040", color: '#000000' }}>ADD TO CARD</Button>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

export default Product