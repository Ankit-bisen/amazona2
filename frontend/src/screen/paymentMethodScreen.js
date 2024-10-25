import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { CheckOutStep } from '../Components/CheckOutStep'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const PaymentMethodScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { card } = useSelector(state => state.product)
    const [paymentMethodName, setPaymentMethod] = useState(card.paymentMethod || "PayPal")

    // useEffect(() => {
    //     if (!card?.shippingAddres?.address) {
    //         navigate('/shipping')
    //     }
    // }, [card, navigate])
    // useEffect(() => {
    //     if (card?.paymentMethod) {
    //         navigate('/placeorder')
    //     }
    // }, [card])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName })
        navigate('/placeorder')
    }
    return (
        <div>
            <CheckOutStep step1 step2 step3></CheckOutStep>

            <div className='container small-container'>
                <h1 className='my-3'> Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className='mb-3'>
                        <Form.Check
                            type="radio"
                            id="PayPal"
                            label="PayPal"
                            value="PayPal"
                            checked={paymentMethodName === "PayPal"}
                            onChange={(e) => { setPaymentMethod(e.target.value) }}
                        />

                        <Form.Check
                            type="radio"
                            id="stripe"
                            label="stripe"
                            value="stripe"
                            checked={paymentMethodName === "stripe"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />


                    </div>
                    <div className="mb-3">
                        <Button type='submit' className="btn-primary" style={{ backgroundColor: "#f0c040", color: '#000000' }}>Continue</Button>
                    </div>
                </Form>

            </div>
        </div>
    )
}
