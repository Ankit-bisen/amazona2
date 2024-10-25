import { combineReducers } from "redux";
import productReducer from "./product/productReducer.js"
import userReducer from './user/userReducer.js'



export default combineReducers({

    product: productReducer,
    user: userReducer
})