import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
const LoadingBox = () => {
    return (
        <Spinner animation="border" role="status" >
            <span className='visually-hidden' style={{ justifyContent: "center" }}>loading ...</span>
        </Spinner>
    )
}

export default LoadingBox