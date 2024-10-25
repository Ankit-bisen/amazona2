import React, { useEffect } from 'react'
import LoadingBox from '../Components/LoadingBox'
import MassageBox from '../Components/ErrorBox'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { OrderHistoryFatch } from '../action/productAction'


export default function OrderHistory() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { order, orders } = useSelector(state => state.product)

    const { userInfo, error, Loading } = useSelector(state => state.user)
    console.log("userInfo", userInfo.token)


    useEffect(() => {
        dispatch(OrderHistoryFatch(userInfo?.token))
    }, [userInfo])

    return (
        <>
            <div className='container small-container'>
                <h1>Order History</h1>
                {Loading ? (<LoadingBox />)
                    : error ? (
                        <MassageBox variant='danger'>{error}</MassageBox>
                    ) : (
                        <table className="table" >
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>DELIVERED</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    orders?.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                                            <td>
                                                <Button
                                                    type="button"
                                                    variant='light'
                                                    onClick={() => {
                                                        navigate(`/order/${order?._id}`)
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>


                        </table>
                    )

                }
            </div>
        </>
    )
}
