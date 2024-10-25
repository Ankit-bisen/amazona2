import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckOutStep } from '../Components/CheckOutStep';

export const SeepingAdressScreen = () => {
    const navigate = useNavigate()
    const { card } = useSelector(state => state.product)
    const { userInfo } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const [state, setState] = useState({
        fullName: card?.shippingAddres?.fullName || "",
        address: card?.shippingAddres?.address || "",
        city: card?.shippingAddres?.city || "",
        postelCode: card?.shippingAddres?.postelCode || "",
        country: card?.shippingAddres?.country || ""
    })



    useEffect(() => {
        if (!userInfo) {


            navigate('/signin?redirect=/shipping')
        }
    }, [userInfo, card?.shippingAddres])



    // // useEffect(() => {
    // //     if (card?.shippingAddress) {
    // //         navigate('/payment')
    // //     }


    // }, [card?.shippingAddress])

    const formSubmit = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        dispatch({ type: "SHIPPING_ADDRESS", payload: state })
        navigate('/payment')
    }

    return (
        <div >
            <CheckOutStep step1 step2></CheckOutStep>
            <div className='container small-container ' style={{ maxWidth: "500px" }}>

                <h2 className='my-3'>Shipping Address</h2>
                <Form onSubmit={formSubmitHandler}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>fullName</Form.Label>
                        <Form.Control
                            // value="fullName"
                            name="fullName"
                            onChange={formSubmit}
                        />


                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            // value={state}
                            name="address"
                            onChange={formSubmit}

                        />


                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            // value={state}
                            name="city"
                            onChange={formSubmit}

                        />


                    </Form.Group>

                    <Form.Group className="mb-3" controlId="postelCode">
                        <Form.Label>Postel Code</Form.Label>
                        <Form.Control
                            // value={state}
                            name="postelCode"
                            onChange={formSubmit}

                        />


                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            // value={state}
                            name="country"
                            onChange={formSubmit}

                        />





                    </Form.Group>

                    <div className='mb-3'>
                        <Button variant="primary" type="submit"
                            style={{ backgroundColor: "#f0c040", color: '#000000' }}
                        >Continue </Button>
                    </div>
                </Form>

            </div>

        </div>
    )
}
