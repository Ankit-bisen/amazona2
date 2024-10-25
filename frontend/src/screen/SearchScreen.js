import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../Components/Rating';
import LoadingBox from '../Components/LoadingBox';
import ErrorBox from '../Components/ErrorBox';
import Button from 'react-bootstrap/Button';
import Product from '../Components/Product';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdata } from '../action/productAction';

const prices = [
    { price: "$1 to $50", value: "1-50" },
    { price: "$51 to $200", value: "51-200" },
    { price: "$201 to $1000", value: "201-1000" },
];

export const ratings = [
    { name: "4 stars & up", rating: 4 },
    { name: "3 stars & up", rating: 3 },
    { name: "2 stars & up", rating: 2 },
    { name: "1 star & up", rating: 1 },
];

export default function SearchScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();

    const sp = new URLSearchParams(search);
    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'all';
    const page = sp.get('page') || 1;

    const { error, loading, products, pages, countProducts } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchdata(category, page, price, query, rating, order));
    }, [dispatch, category, page, price, query, rating, order]);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/product/categories');
                setCategories(data);
            } catch (error) {
                console.log(error)
                toast.error(getError(error));
            }
        };
        fetchCategories();
    }, []);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterPrice = filter.price || price;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        return [{ "pathname": `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}` }];
    };

    return (
        <div>
            <h1>Search Product</h1>
            <Row>
                <Col md={3}>
                    <h3>Department</h3>
                    <ul>
                        <li>
                            <Link to={getFilterUrl({ category: "all" })}
                                className={category === "all" ? 'text-bold' : ''}>
                                Any
                            </Link>
                        </li>
                        {categories.map((c) => (
                            <li key={c}>
                                <Link to={getFilterUrl({ category: c })}
                                    className={c === category ? 'text-bold' : ''}>
                                    {c}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h3>Price</h3>
                    <ul>
                        <li>
                            <Link to={getFilterUrl({ price: "all" })}
                                className={price === "all" ? 'text-bold' : ''}>
                                Any
                            </Link>
                        </li>
                        {prices.map((p) => (
                            <li key={p.value}>
                                <Link to={getFilterUrl({ price: p.value })}
                                    className={p.value === price ? 'text-bold' : ''}>
                                    {p.price}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h3>Avg. Customer Reviews</h3>
                    <ul>
                        {ratings.map((r) => (
                            <li key={r.name}>
                                <Link to={getFilterUrl({ rating: r.rating })}
                                    className={r.rating === parseInt(rating) ? 'text-bold' : ''}>
                                    <Rating caption={' & up'} rating={r.rating}></Rating>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link to={getFilterUrl({ rating: "all" })}
                                className={rating === 'all' ? 'text-bold' : ''}>
                                <Rating caption={' & up'} rating={0}></Rating>
                            </Link>
                        </li>
                    </ul>
                </Col>

                <Col md={9}>
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <ErrorBox variant="danger">{error}</ErrorBox>
                    ) : (
                        <>
                            <Row className='justify-content-between mb-3'>
                                <Col md={6}>
                                    <div>
                                        {countProducts === 0 ? "No" : countProducts} results
                                        {query !== "all" && ` : ${query}`}
                                        {category !== "all" && ` : ${category}`}
                                        {price !== "all" && ` : Price ${price}`}
                                        {rating !== "all" && ` : Rating ${rating} & up`}
                                        {(query !== "all" || category !== "all" || rating !== "all" || price !== "all") && (
                                            <Button variant='light' onClick={() => navigate('/search')}>
                                                <i className='fas fa-times-circle'></i>
                                            </Button>
                                        )}
                                    </div>
                                </Col>
                                <Col className='text-end'>
                                    Sort by{' '}
                                    <select value={order}
                                        onChange={(e) => navigate(getFilterUrl({ order: e.target.value }))}>
                                        <option value='newest'>Newest Arrivals</option>
                                        <option value='lowest'>Price: Low to High</option>
                                        <option value='highest'>Price: High to Low</option>
                                        <option value='toprated'>Avg. Customer Reviews</option>
                                    </select>
                                </Col>
                            </Row>

                            {products.length === 0 && <ErrorBox>No Products Found</ErrorBox>}

                            <Row>
                                {products.map((product) => (
                                    <Col sm={6} lg={4} className='mb-3' key={product._id}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>

                            <div className='pagination'>
                                {[...Array(pages).keys()].map((x) => (
                                    <LinkContainer key={x + 1} className='mx-1' to={getFilterUrl({ page: x + 1 })}>
                                        <Button className={Number(page) === x + 1 ? 'text-bold' : ''}>{x + 1}</Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
}
