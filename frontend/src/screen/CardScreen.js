
import React from 'react'
import MassageBox from '../Components/ErrorBox'
import { NavLink, useNavigate } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'




const CardScreen = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { product, card } = useSelector(state => state.product)
    const { error, userInfo } = useSelector(state => state.user)

    const updateCardHandler = async (item, quantity) => {
        const { data } = await axios.get(`http://localhost:5000/api/product/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('sorry . product is not of stock')
            return;
        }
        dispatch({
            type: "ADD_TO_CARD",
            payload: { ...item, quantity: quantity }
        })

    }

    const removeCardHandler = (item) => {
        dispatch({ type: "REMOVE_CARD_HENDLER", payload: item })
    }

    const checkoutHendler = () => {
        if (userInfo) {

            navigate('/shipping')
        } else {
            navigate('/signin')
        }
    }
    return (
        <div>


            <h3>Shoping Card</h3>
            <Row>
                <Col md={8}>
                    {
                        card.cardItem == 0 ? (
                            <MassageBox>
                                <h5> card is empty <NavLink to="/" >Go Shoping</NavLink></h5>
                            </MassageBox>
                        ) : (
                            <ListGroup>
                                {
                                    card?.cardItem?.map((item) => (
                                        <ListGroup.Item kay={item._id}>
                                            <Row className='align-items-center'>
                                                <Col md={3}>
                                                    <img src={item.image} alt={item.name}
                                                        className='image-fluid rounded img-thumbnail'
                                                        style={{ height: "80px" }}
                                                    ></img>{' '}
                                                </Col>
                                                <Col md={3}>
                                                    <NavLink to={`/product/${product.slug}`}>{item.name}</NavLink>
                                                </Col>

                                                <Col md={3}>
                                                    <Button variant="light"
                                                        onClick={() => updateCardHandler(item, item.quantity - 1)}
                                                        disabled={item.quantity === 1}>
                                                        <i className='fas fa-minus-circle'></i>
                                                    </Button> {" "}
                                                    <span>{item.quantity}</span> {' '}
                                                    <Button variant="light"
                                                        onClick={() => updateCardHandler(item, item.quantity + 1)}
                                                        disabled={item.quantity === item.countInStock}>
                                                        <i className='fas fa-plus-circle'></i>
                                                    </Button> {" "}
                                                </Col>
                                                <Col md={2}>${item.price}</Col>
                                                <Col md={1} >
                                                    <Button
                                                        onClick={() => removeCardHandler(item)}
                                                        variant="light">

                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Col>
                                             
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>)

                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>
                                        SubTotal ({card.cardItem.reduce((a, c) => a + c.quantity, 0)} {" "}
                                        item) :$
                                        {card.cardItem.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='d-grid'>
                                        <Button type='button'
                                            variant='primary'
                                            onClick={checkoutHendler}
                                            style={{ backgroundColor: "#f0c040", color: '#000000' }}
                                            disabled={card.cardItem === 0}
                                        >
                                            Procced To Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CardScreen