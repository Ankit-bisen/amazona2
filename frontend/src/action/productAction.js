import axios from "axios"
import { getError } from "../utils"


export const handleProductList = () => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_LOADING" })
        const { data } = await axios.get('https://amazona2-j8bw.onrender.com/api/product')
        dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: 'PRODUCT_LIST_ERROR', payload: error.response?.data?.message || error.message })
    }

}

export const HandleProductOne = (slug) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_LOADING" })
        const { data } = await axios.get(`https://amazona2-j8bw.onrender.com/api/product/slug/${slug}`)
        dispatch({ type: "PRODUCT_LIST_ONE", payload: data })
    } catch (error) {
        dispatch({ type: 'PRODUCT_LIST_ERROR', payload: error.response?.data?.message || error.message })

    }
}

export const handlleSigninForm = (payload) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_LOADING" })
        const { data } = await axios.post("https://amazona2-j8bw.onrender.com/api/user/signin", payload)
        dispatch({ type: "USER_SIGNIN", payload: data })
    } catch (error) {
        dispatch({ type: 'PRODUCT_LIST_ERROR', payload: error.response?.data?.message || error.message })

    }
}

export const handlleSignUpForm = (payload) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_LOADING" })
        const { data } = await axios.post("https://amazona2-j8bw.onrender.com/api/user/signup", payload)
        dispatch({ type: "USER_SINGNUP", payload: data })
    } catch (error) {
        dispatch({ type: 'PRODUCT_LIST_ERROR', payload: error.response?.data?.message || error.message })
    }
}
export const fetchOrder = (orderId, token) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_LOADING" })
        const { data } = await axios.get(`https://amazona2-j8bw.onrender.com/api/orders/${orderId}`,
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        )
        dispatch({ type: "ORDER_FETCH_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: 'PRODUCT_LIST_ERROR', payload: error.response?.data?.message || error.message })
    }
}


export const OrderHistoryFatch = (token) => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_LOADING" })
        const { data } = await axios.get('https://amazona2-j8bw.onrender.com/api/orders/mine',
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

        )
        console.log("data", data)
        dispatch({ type: "ORDER_HISTORY_FETCH_SUCCESS", payload: data })

    } catch (error) {
        console.log("errror", error)
        dispatch({ type: 'FETCH_ERROR', payload: error.response?.data?.message || error.message })

    }

}

export const userProfileUpdate = (payload, token) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_LOADING" })
        const { data } = await axios.put('https://amazona2-j8bw.onrender.com/api/user/profile', { payload },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        )
        dispatch({ type: 'USER_PROFILE_UPDATE', payload: data })
        alert("user update successfully")
    } catch (error) {
        dispatch({ type: 'UPDATE_ERROR', payload: error.response?.data?.message || error.message })
        alert(error)
    }
}

export const fetchdata = (category, page, price, query, rating, order) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            `https://amazona2-j8bw.onrender.com/api/product/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        )
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) })
    }

}