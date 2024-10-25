import { createStore, compose, applyMiddleware } from "redux";
import combineReducers from "./reducer/index.js";
import { thunk } from "redux-thunk";

const intialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    combineReducers,
    intialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store; 