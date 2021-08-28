import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../actions/customerAction";
import { Redirect} from 'react-router-dom'
const Signout = () => {
    
 
    const dispatch = useDispatch();
    const customer = useSelector((state) => state.customer);
    useEffect(() => {
    dispatch(signOut(customer.email));
});
    return ( 
        <Redirect to="/signin" />
        )
    }
 
export default Signout;