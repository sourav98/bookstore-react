import { combineReducers } from "redux";
import BookReducer from "./bookReducer";
import CustomerReducer from "./customerReducer";


const rootReducer = combineReducers({
    store : BookReducer,
    customer: CustomerReducer
})

export default rootReducer