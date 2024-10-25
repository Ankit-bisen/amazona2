import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handlleSignUpForm } from '../action/productAction';
const SignupScreen = () => {
    const { error, userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [state, setState] = useState({
        name: "",
        email: "",
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
        if (state.password !== state.confirmpassword) {
            alert("passwords do not match")
        } else {

            dispatch(handlleSignUpForm(state))
        }

    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo])

    return (
        <Container className="container small-container" style={{ maxWidth: "600px" }}>
            <h1 className="my-3">Sign UP</h1>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Form onSubmit={submitHander}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" name='name' required onChange={handleSubmitEmail}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' required onChange={handleSubmitEmail}></Form.Control>
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
                    >Sign Up</Button>
                </div>
                <div className="mb-3">
                    All ready have a Account ?{' '}
                    <NavLink to={`/signin?redirect=${redirect}`}>Sign In</NavLink>
                </div>
            </Form>
        </Container>
    );
};

export default SignupScreen;
