import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useNavigate } from 'react-router-dom'

export default function SearchBox() {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    const submiHandler = (e) => {
        console.log('query', query)
        e.preventDefault()
        navigate(query ? `/search/?query=${query}` : "/search")
    }

    return <Form classame='d-flex me-auto' onSubmit={submiHandler} style={{ marginLeft: "20px" }}>
        <InputGroup>
            <FormControl
                type='text'
                name='q'
                id='q'
                placeholder="search products"
                onChange={(e) => setQuery(e.target.value)}
                arial-label="search products"
                arial-describedby='button-search'
            >
            </FormControl>
            <Button variant='outline-primary' type='submit' id='button-search' style={{ backgroundColor: "#f0c040", color: '#000000' }}>
                <i className='fas fa-search'></i>
            </Button>
        </InputGroup>

    </Form>

}