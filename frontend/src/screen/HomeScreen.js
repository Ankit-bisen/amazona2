import React, { useEffect } from 'react'
// import { data } from '../data'
// import { NavLink } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Product from '../Components/Product'
import { useDispatch, useSelector } from 'react-redux';
import { handleProductList } from '../action/productAction';
import LoadingBox from '../Components/LoadingBox';
import MassageBox from '../Components/ErrorBox';

const HomeScreen = () => {
    const { products, loading, error } = useSelector(state => state.product)
    // const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleProductList())
        // const fetchdata = async () => {
        //     const result = await axios.get('https://amazona2-j8bw.onrender.com/api/product')
        //     setProducts(result.data)
        // }
        // fetchdata()
    }, [])
    return (
        <main>
            <h1>Featured Products</h1>
            {loading ? (<LoadingBox />) : error ? (<div><MassageBox /></div>) :
                <div div className='products'>
                    <Row>
                        {
                            products?.map(product => (
                                <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                                    <Product product={product} />

                                </Col>
                            ))
                        }
                    </Row>
                </div>}
        </main >
    )
}

export default HomeScreen