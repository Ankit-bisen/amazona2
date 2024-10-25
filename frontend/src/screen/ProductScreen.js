import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Rating from '../Components/Rating';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { HandleProductOne } from '../action/productAction';
import MassageBox from '../Components/ErrorBox';
import LoadingBox from '../Components/LoadingBox';
import axios from 'axios';


const ProductScreen = () => {
    const { loading, product, error, card } = useSelector(state => state.product)
    const params = useParams()
    const { slug } = params

    // const [product, setProducts] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(HandleProductOne(slug))
        document.title = slug
        // const fetchdata = async () => {
        //     const result = await axios.get(`http://localhost:5000/api/product/slug/${slug}`)
        //     setProducts(result.data)
        // }
        // fetchdata()
    }, [slug])

    const addToCardHandler = async () => {
        try {

            const existItem = card.cardItem.find((x) => x._id === product._id)
            const quantity = existItem ? existItem.quantity + 1 : 1
            const { data } = await axios.get(`http://localhost:5000/api/product/${product._id}`)
            if (data.countInStock < quantity) {
                alert('sorry . product is not of stock')
                return;
            }
            dispatch({ type: "ADD_TO_CARD", payload: { ...product, quantity: quantity } })
            navigate('/card')
        } catch (error) {
            console.log("api errorr", error)
        }
    }
    return (

        <div>
            {loading ? (<LoadingBox />) : error ? (<MassageBox>{error}</MassageBox>) : <Row>
                <Col md={6}>
                    <img className='img-large ' style={{ maxWidth: "100%" }} src={product?.image} alt={product.name}></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>{product?.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product?.rating} numReviews={product.numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3> price : ${product?.price}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Discription :
                            <p>{product?.Description}</p>
                        </ListGroup.Item>


                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>price :</Col>
                                        <Col> ${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>stock :</Col>
                                        <Col>{product.countInStock > 0 ? (
                                            <Badge bg="success">in stock</Badge>
                                        ) : <Badge bg="danger">out of stock</Badge>
                                        }</Col>
                                    </Row>
                                </ListGroup.Item>

                                {
                                    product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <div className='d-grid'>
                                                <Button variant='primary' style={{ backgroundColor: "#f0c040", color: '#000000' }} onClick={addToCardHandler}>ADD TO CARD</Button>

                                            </div>
                                        </ListGroup.Item>
                                    )
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>}
        </div>
    )
}

export default ProductScreen