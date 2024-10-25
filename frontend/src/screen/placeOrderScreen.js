import React from 'react'
import { CheckOutStep } from '../Components/CheckOutStep'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
import LoadingBox from '../Components/LoadingBox';
import MassageBox from '../Components/ErrorBox';






export default function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { card } = useSelector(state => state.product)
    const { userInfo, loading, error } = useSelector(state => state.user)
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.2345=>123.23
    card.itemPrice = round2(
        card.cardItem.reduce((a, c) => a + c.quantity * c.price, 0)
    )
    card.shippingPrice = card.itemPrice > 100 ? round2(0) : round2(10);
    card.taxPrice = round2(0, 15 * card.itemPrice);
    card.totalPrice = card.itemPrice + card.shippingPrice + card.taxPrice;


    const placeOrderHandler = async () => {
        try {
            dispatch({ type: "PRODUCT_LOADING" })
            const { data } = await axios.post('http://localhost:5000/api/orders',
                {
                    orderItem: card.cardItem,
                    shippingAddress: card.shippingAddress,
                    paymentMethod: card.paymentMethod,
                    itemPrice: card.itemPrice,
                    shippingPrice: card.shippingPrice,
                    totalPrice: card.totalPrice,
                    taxPrice: card.taxPrice
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                }
            )
            dispatch({ type: "CARD_CLEAR" })
            dispatch({ type: "CREATE_SUCCESS", payload: data })
            navigate(`/order/${data.order._id}`)

        } catch (error) {
            dispatch({ type: 'PRODUCT_LIST_ERROR', payload: error.response?.data?.message || error.message })

        }
    }

    return (
        <div>
            <CheckOutStep step1 step2 step3 step4></CheckOutStep>
            <h1 className="my-3">Preview Order</h1>
            {
                error && <MassageBox variant="danger">{error}</MassageBox>
            }
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name :</strong> {card.shippingAddress.fullName} <br></br>
                                <strong>Address :</strong> {card.shippingAddress.address} {card.shippingAddress.city}
                                {card.shippingAddress.postalCode} {card.shippingAddress.country}
                            </Card.Text>
                            <NavLink to='/shipping'>Edit</NavLink>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method :</strong> {card.paymentMethod} <br></br>


                            </Card.Text>
                            <NavLink to='/payment'>Edit</NavLink>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Item</Card.Title>
                            <ListGroup variant='flush'>
                                {
                                    card.cardItem.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-item-center">
                                                <Col md={6}>
                                                    <img src={item.image} alt={item.name}
                                                        className='img-fluid rounded img-thumbnail '
                                                        style={{ height: "80px" }}
                                                    >
                                                    </img>{" "}
                                                    <NavLink to={`/product/${item.slug}`}>{item.name}</NavLink>
                                                </Col>
                                                <Col md={3}><span> {item.quantity}</span></Col>
                                                <Col md={3}><span> {item.price}</span></Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                            </ListGroup>
                            <NavLink to="/card">Edit</NavLink>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Order Summary
                            </Card.Title>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>items</Col>
                                        <Col>${card.itemPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${card.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tex</Col>
                                        <Col>${card.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Order Total</Col>
                                        <Col>${card.totalPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            onClick={placeOrderHandler}
                                            style={{ backgroundColor: "#f0c040", color: '#000000' }}
                                            disabled={card.cardItem.length === 0}
                                        >
                                            Place Order
                                        </Button>
                                        {loading && <LoadingBox />}
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
