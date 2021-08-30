const orderInitialState = {
    orderDetails:[],
    orderDetails:{}
}

const OrderReducer = (state=orderInitialState ,action) => 
{
    switch(action.type) {
        case "GET_ALL_ORDERS":
            return {...state,orderDetails:[...action.payload]}
        case "ADD_ORDER":
            return {...state,orderDetails:[...orderDetails,action.payload]}
        case "DELETE_ORDER":
            const orderDetails=state.orderDetails.filter((od) => od.id!==action.payload)
            return {...state,orderDetails:orderDetails}
        case "UPDATE_ORDER":
            return state.orderDetails.map(od => od.id===action.payload.id?action.payload:p)              
        default:
            return state
        }
}

export default OrderReducer