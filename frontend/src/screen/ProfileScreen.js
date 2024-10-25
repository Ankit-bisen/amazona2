import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileUpdate } from '../action/productAction';


export default function ProfileScreen() {
    const dispatch = useDispatch()
    const { error, userInfo } = useSelector(state => state.user)
   
    const [state, setState] = useState({
        name: userInfo.name || "",
        email: userInfo.email || "",
        password: "",
        confirmpassword: ""
    })
    const handleSubmitEmail = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submitHander = (e) => {
        e.preventDefault()
        dispatch(userProfileUpdate(state,userInfo.token))

    }

    return (
        <Container className="container small-container" style={{ maxWidth: "600px" }}>
            <h1 className="my-3">Profile</h1>
            <Form onSubmit={submitHander}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={state.name} name='name' required onChange={handleSubmitEmail}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={state.email} name='email' required onChange={handleSubmitEmail}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' required onChange={handleSubmitEmail}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name='confirmpassword' required onChange={handleSubmitEmail}></Form.Control>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit"
                        style={{ backgroundColor: "#f0c040", color: '#000000' }}
                    >Update</Button>
                </div>
            </Form>
        </Container>
    )
}
