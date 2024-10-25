const intialState = {

    loading: false,
    orderData: "",
    error: '',
    products: [],
    order: [],
    orders: [],
    product: {},
    card: {
        shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")),
        cardItem: localStorage.getItem("cardItem")
            ? JSON.parse(localStorage.getItem("cardItem")) : [],
        paymentMethod: JSON.parse(localStorage.getItem("paymentMethod"))
    }


}


const reducer = (state = intialState, action) => {

    switch (action.type) {
        case "PRODUCT_LOADING":

            return {
                ...state,
                loading: true,
            }
    }
    switch (action.type) {
        case "PRODUCT_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case 'PRODUCT_LIST_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }


    switch (action.type) {
        case "PRODUCT_LIST_ONE":
            return {
                ...state,
                loading: false,
                product: action.payload
            }

    }
    switch (action.type) {
        case "ADD_TO_CARD":

            const newItem = action.payload
            const existItem = state.card.cardItem.find((item) => item._id === newItem._id);
            const cardItem = existItem
                ? state.card.cardItem.map((item) => item._id === existItem._id ? newItem : item)
                : [...state.card.cardItem, newItem]
            localStorage.setItem("cardItem", JSON.stringify(cardItem))
            return {
                ...state,
                laoding: false,
                card: { ...state.card, cardItem }

            }

    }
    switch (action.type) {
        case "REMOVE_CARD_HENDLER":
            const cardItem = state.card.cardItem.filter(
                (item) => item._id !== action.payload._id
            )
            localStorage.setItem("cardItem", JSON.stringify(cardItem))

            return {
                ...state,
                laoding: false,
                card: { ...state.card, cardItem }
            }

        case "SHIPPING_ADDRESS":
            localStorage.setItem("shippingAddress", JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                card: {
                    ...state.card,
                    shippingAddress: action.payload
                }
            }
        case "SAVE_PAYMENT_METHOD":
            localStorage.setItem("paymentMethod", JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                card: {
                    ...state.card,

                    paymentMethod: action.payload
                }
            }

        case "USER_SIGNOUT":
            localStorage.removeItem("shippingAddress")
            localStorage.removeItem("cardItem")
            localStorage.removeItem("paymentMethod")
            return {
                card: {
                    ...state.card,
                    shippingAddress: {},
                    cardItem: [],
                    paymentMethod: {}
                }
            }
        case "CARD_CLEAR":
            localStorage.removeItem("cardItem")
            return {
                card: {
                    ...state.card,
                    cardItem: [],
                }
            }
        case "CREATE_SUCCESS":
            return {
                ...state,
                loading: false,
                orderData: action.payload
            }

        case 'ORDER_FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                order: action.payload.order
            }

        case 'PAY_REQUEST':
            return {
                ...state,
                loadingPay: true
            }

        case 'PAY_SUCCESS':
            return {
                ...state,
                loadingPay: false,
                successPay: true
            }
        case 'PAY_FAIL':
            return {
                ...state,
                loadingPay: false
            }
        case 'PAY_RESET':
            return {
                ...state,
                loadingPay: false,
                successPay: false
            }

        case 'FETCH_LOADING':
            return {
                ...state,
                loading: true,
                error: ''
            }

        case 'ORDER_HISTORY_FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: ''

            }
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: ''
            }

    }

    return state
}


export default reducer