import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom'
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import CardScreen from './screen/CardScreen';
import SigninScreen from './screen/SigninScreen';
import { LinkContainer } from "react-router-bootstrap"
import { SeepingAdressScreen } from './screen/SeepingAdressScreen';
import SignupScreen from './screen/SignupScreen';
import { PaymentMethodScreen } from './screen/paymentMethodScreen';
import PlaceOrderScreen from './screen/placeOrderScreen';
import { OrderScreen } from './screen/OrderScreen';
import OrderHistory from './screen/OrderHistory';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import ProfileScreen from './screen/ProfileScreen';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import SearchBox from './Components/SearchBox';
import SearchScreen from './screen/SearchScreen';
import ProtectedRoutes from './Components/ProtectedRoutes';
import DeshboardScreen from './screen/DeshboardScreen';
import AdminRoutes from './Components/AdminRoutes';

function App() {
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.user)
  const { card } = useSelector(state => state.product)
  document.title = "Amazona  - all product buy now"

  const signOutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" })
    window.location.href = '/signin'

  }

  const [sidebarOpan, setSidebarOpen] = useState(false)
  const [Categories, setCategories] = useState([])

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/product/categories')
        setCategories(data)

      } catch (error) {
        alert(error)
      }
    }


    fetchCategories()
  }, [])

  return (
    <BrowserRouter>
      <div className={sidebarOpan ? 'd-flex flex-column site-Container active-cont' :
        'd-flex flex-column site-Container'}
      >
        <header >

          <Navbar className="navbar navbar-dark bg-dark" bg="light" expand='lg'>
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarOpen(!sidebarOpan)}

              >
                <i className='fas fa-bars'></i>
              </Button>
              <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>amazona</NavLink>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to={"/card"} className='nav-link' >
                    Card

                    {card.cardItem.length > 0 && (
                      <Badge pill bg="danger">{card.cardItem.reduce((a, c) => a + c.quantity, 0)}</Badge>
                    )}
                  </Link>

                  {
                    userInfo ?
                      <NavDropdown title={userInfo.name} id="basic-nav-dropdown"  >
                        <LinkContainer to="/profile">
                          <NavDropdown.Item style={{ color: "white" }}>User profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orderHistory">
                          <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <Link
                          className='dropdown-item'
                          to="#signOut"
                          onClick={signOutHandler}

                        >
                          Sign Out
                        </Link>
                      </NavDropdown>
                      :
                      <Link className="nav-link" to="/signin" >
                        Sign In
                      </Link >


                  }
                  {
                    userInfo && userInfo.isAdmin && (
                      <NavDropdown title='Admin' id="admin-nav-dropdown">
                        <LinkContainer to='/admin/deshboard'>
                          <NavDropdown.Item>deshboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/productList'>
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/orderLists'>
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/userList'>
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

        </header>

        <div
          className={sidebarOpan ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column" :
            'side-navbar d-flex justify-content-between flex-wrap flex-column'



          }

        >
          <Nav>
            <Nav.Item className='flex-column text-white w-100 p-2'>
              <strong>Categories</strong>
            </Nav.Item>
            {
              Categories.map((category) => (
                <Nav.Item key={category}>
                  <LinkContainer
                    to={{ pathname: '/search', search: `category=${category}` }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Nav.Link>{category}</Nav.Link>
                  </LinkContainer>

                </Nav.Item>
              ))
            }
          </Nav>

        </div>

        <Routes>
          <Route path="/" Component={HomeScreen} />
          <Route path="/product/:slug" Component={ProductScreen} />
          <Route path='/card' Component={CardScreen}></Route>
          <Route path='/search' Component={SearchScreen}></Route>
          <Route path='/signin' Component={SigninScreen}></Route>
          <Route path='/signup' Component={SignupScreen}></Route>
          <Route path='/shipping' Component={SeepingAdressScreen}></Route>
          <Route path='/payment' Component={PaymentMethodScreen}></Route>
          <Route path='/placeorder' Component={PlaceOrderScreen}></Route>
          <Route path='/order/:id' element={
            <ProtectedRoutes>

              <OrderScreen></OrderScreen>
            </ProtectedRoutes>

          }></Route>
          <Route path='/orderHistory' element={
            <ProtectedRoutes>

              <OrderHistory></OrderHistory>
            </ProtectedRoutes>
          }></Route>
          <Route path='/profile'
            element={
              <ProtectedRoutes>

                <ProfileScreen></ProfileScreen>
              </ProtectedRoutes>

            }></Route>
          <Route path='/admin/deshboard'
            element={<AdminRoutes><DeshboardScreen /></AdminRoutes>}
          />
        </Routes>
        <footer>
          <div className='text-center'>All right reserved</div>
        </footer>
      </div>
    </BrowserRouter >
  );
}

export default App;
