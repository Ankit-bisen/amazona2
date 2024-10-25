const intialState = {

    loading: false,
    updateloading: false,
    error: '',
    products:[],
    page:'',
    pages:'',
    countProducts:"",
    

    // userToken: localStorage.getItem("userToken"),
    userInfo: JSON.parse(localStorage.getItem("userInfo")),


}



const reducer = (state = intialState, action) => {

    switch (action.type) {
        case "PRODUCT_LOADING":

            return {
                ...state,
                loading: true,
            }

        case "USER_SIGNIN":
            localStorage.setItem("userInfo", JSON.stringify(action?.payload))
            // localStorage.setItem("userToken", action?.payload.token)
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
            }

        case "PRODUCT_LIST_ERROR":
            return {
                loading: false,
                error: action.payload
            }
        case "USER_SIGNOUT":
            localStorage.removeItem("userInfo")
            return {
                userInfo: null
            }

        case "USER_SINGNUP":
            return {
                loading: false,
                userInfo: action.payload
            }
        case 'UPDATE_LOADING':
            return {
                ...state,
                updateloading: true
            }
        case 'USER_PROFILE_UPDATE':
            return {
                ...state,
                updateloading: false,
            }
        case 'UPDATE_ERROR':
            return {
                ...state,
                updateloading: false,
            }

        case 'FETCH_REQUEST':
            return {
                ...state,
                loading: true
            }
        case "FETCH_SUCCESS":
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
                loading: false

            }
        case "FETCH_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }


    return state
}


export default reducer