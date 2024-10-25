import React, { useEffect } from 'react'
import LoadingBox from '../Components/LoadingBox'
import MassageBox from '../Components/ErrorBox'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchOrder } from '../action/productAction'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'





export const OrderScreen = () => {
    const params = useParams()
    const { id: orderId } = params
    const { userInfo } = useSelector(state => state.user)
    const { order, card, successPay, loadingPay } = useSelector(state => state.product)

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

    const navigate = useNavigate()
    const dispatch = useDispatch()



    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice }
                    }
                ]
            }).then((orderId) => {
                return orderId
            })
    }

    const onApprove = (data, actions) => {
        console.log("actions", actions)
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' });
                const { data } = await axios.put(
                    `https://amazona2-j8bw.onrender.com/api/orders/${order?._id}/pay`,
                    details,
                    {
                        headers: {
                            authorization: `Bearer ${userInfo?.token}`,
                        },
                    }
                );
                dispatch({ type: 'PAY_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'PAY_FAIL', payload: error.message });
            }
        });
    };


    function onError(err) {
        alert(err)
    }

    useEffect(() => {
        dispatch(fetchOrder(orderId, userInfo?.token))
        if (!userInfo) {
            navigate('/login')
        }

        if (!orderId || successPay || (order._id && order._id !== orderId)) {
            dispatch(fetchOrder(orderId, userInfo?.token))
            if (successPay) {
                dispatch({ type: 'PAY_RESET' })
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('https://amazona2-j8bw.onrender.com/api/keys/paypal', {
                    headers: {
                        authorization: `Bearer ${userInfo?.token}`
                    }
                })
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        "client-id": clientId,
                        currency: "USD"
                    }
                })
                paypalDispatch({ type: "setLoadingStatus", value: 'pending' })
            }
            loadPaypalScript()
        }
    }, [userInfo, navigate, paypalDispatch, successPay, dispatch, order?._id, orderId])


    return (
        // loading ?
        //     (<LoadingBox />) :
        //     error ? (
        //         <MassageBox variant="danger">{error}</MassageBox>
        //     ) : (
        <div>
            <h1 className="my-3">Order {orderId}</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name :</strong> {card?.shippingAddress?.fullName} <br></br>
                                <strong>Address :</strong> {card?.shippingAddress?.address} {card?.shippingAddress?.city}{" "}
                                {card?.shippingAddress?.postelCode} {" "} {card?.shippingAddress?.country}
                            </Card.Text>
                            {
                                order.isDelivered ? (
                                    <MassageBox variant='success'>Delivered at {order.deliveredAt}
                                    </MassageBox>
                                ) :
                                    <MassageBox variant='danger'> Not Delivered </MassageBox>
                            }
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method :</strong> {card.paymentMethod} <br></br>


                            </Card.Text>
                            {
                                order.isPaid ? (
                                    <MassageBox variant='success'>Paid At {order.paidAt}
                                    </MassageBox>
                                ) :
                                    <MassageBox variant='danger'> Not Paid </MassageBox>
                            }
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Item</Card.Title>
                            <ListGroup variant='flush'>
                                {
                                    order?.orderItem?.map((item) => (
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
                                        <Col>${order?.itemPrice?.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order?.shippingPrice?.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tex</Col>
                                        <Col>${order?.taxPrice?.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Order Total</Col>
                                        <Col>${order?.totalPrice?.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>



                                {!order?.isPaid && (
                                    <ListGroup.Item>
                                        {isPending ? (<LoadingBox />) : (
                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        )}
                                    </ListGroup.Item>
                                )}
                                {loadingPay &&
                                    <LoadingBox></LoadingBox>
                                }

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )


}
