const customerInitialState = {
   customers:[],
   customer:{},
   errMsg: ""
}

const CustomerReducer = (state = customerInitialState, action) => 
{
    switch(action.type) {
        case "REGISTER_CUSTOMER":
            return {...state,...action.payload}
        case "SIGN_IN":
            return { ...state, ...action.payload }
        case "SIGN_OUT":
            return { ...state, ...action.payload };
        case "ERR_RES":
            return { ...state, errMsg: action.payload };
        case "GET_ALL_CUSTOMERS":
            return{ ...state, customers:[...action.payload]}
        default:
            return state
        }
}

export default CustomerReducer