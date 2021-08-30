import React from 'react';
import Base from './Base';
import { useDispatch,useSelector } from "react-redux";
import { Link,NavLink } from 'react-router-dom'
const adminLeftSide = (props) => {

    return(
        <div className="row container-fluid">
    
    <div className="col-md-2"></div>
        <div className="col-md-4">
          <div className="card max-wid rounded-circle shadow" >
            <div className="box p-2 rounded bg-primary text-center">
              <h1 className="fw-light text-white">1</h1>
              <h6 className="text-white"> <i className="fas fa-book"></i> Your Addresses</h6>
            </div>
          </div>
        </div>
       
       
    
        <div className="col-md-4">
        <NavLink style={{ textDecoration: 'none' }} to={"orderdetails/customer/"+props.customerId}>
             <div className="card max-wid rounded-circle shadow">
            <div className="box p-2 rounded bg-danger text-center">
              <h1 className="fw-light text-white">1</h1>
            <h6 className="text-white"><i className="fas fa-users"></i> Your Orders</h6>
            </div>
          </div></NavLink>
        </div>
        <div className="col-md-2"></div>
      </div>
      
    )
}

const UserDashboard = () => {
    const customer = useSelector((state) => state.customer);
    return (  
        <Base title={"Hello " + customer.fullName} description="Access all your account details here">
              {adminLeftSide(customer)}
        </Base>
      
    );
}
 
export default UserDashboard