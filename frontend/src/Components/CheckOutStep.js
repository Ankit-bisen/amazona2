import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const CheckOutStep = (props) => {
    return (
        <Row className="checkout-steps">
            <Col className={props.step1 ? "Active" : ""}>Sign-In</Col>
            <Col className={props.step2 ? "Active" : ""}>Shipping</Col>
            <Col className={props.step3 ? "Active" : ""}>Payment</Col>
            <Col className={props.step4 ? "Active" : ""}>Place-Order</Col>

        </Row>
    )
}
