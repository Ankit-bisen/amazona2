import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { handlleSigninForm } from '../action/productAction';

const SigninScreen = () => {
    const { error, userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const handleSubmitEmail = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submitHander = (e) => {
        e.preventDefault()
        dispatch(handlleSigninForm(state))
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect || '/')
        }
    }, [userInfo])

    return (
        <Container className="small-container" style={{ maxWidth: "600px" }}>
            <h1 className="my-3">Sign in</h1>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Form onSubmit={submitHander}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' required onChange={handleSubmitEmail}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' required onChange={handleSubmitEmail}></Form.Control>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit"
                        style={{ backgroundColor: "#f0c040", color: '#000000' }}
                    >Sign In</Button>
                </div>
                <div className="mb-3">
                    New customer?{' '}
                    <NavLink to={`/signup?redirect=${redirect}`}>Create your account</NavLink>
                </div>
            </Form>
        </Container>
    );
};

export default SigninScreen;
