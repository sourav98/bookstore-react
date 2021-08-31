import React from 'react';
import Base from './Base';
import { useDispatch,useSelector } from "react-redux";
import { Link,NavLink } from 'react-router-dom'
import OrderService from "../services/OrderService";
import { useState, useEffect } from 'react';
import BookOrderService from '../services/BookOrderService';


let orderCount;
let addressCount;

const adminLeftSide = (props) => {

  
    return(
      
        <div className="row container-fluid">
    
    <div className="col-md-2"></div>
        <div className="col-md-4">
        <NavLink style={{ textDecoration: 'none' }} to="customer/address">    <div className="card max-wid rounded-circle shadow" >
            <div className="box p-2 rounded bg-primary text-center">
              <h1 className="fw-light text-white">{addressCount}</h1>
              <h6 className="text-white"> <i className="fas fa-book"></i> Your Addresses</h6>
            </div>
          </div></NavLink>
        </div>
       
       
    
        <div className="col-md-4">
        <NavLink style={{ textDecoration: 'none' }} to={"orderdetails/customer/"+props.customerId}>
             <div className="card max-wid rounded-circle shadow">
            <div className="box p-2 rounded bg-danger text-center">
              <h1 className="fw-light text-white">{orderCount}</h1>
            <h6 className="text-white"><i className="fas fa-users"></i> Your Orders</h6>
            </div>
          </div></NavLink>
        </div>
        <div className="col-md-2"></div>
      </div>
      
    )
}

const UserDashboard = () => {
  const [orderDetails,setOrderDetails] = useState([]);

  const customer = useSelector((state) => state.customer);
  const [bookOrder,setBookOrder] = useState([]);
  
useEffect(() => {
  BookOrderService.getBookOrderByCustomer(customer.customerId).then(res =>{
    setBookOrder(res.data)
  })
 },[])

  useEffect(() => {
    OrderService.listOrderByCustomer(customer.customerId).then(res =>{
     setOrderDetails(res.data)
    })
   },[])

  orderCount=orderDetails.length
  addressCount=bookOrder.length

    return (  
        <Base className="container p-4"  title={"Hello " + customer.fullName} description="Access all your account details here">
               <div className="row">
           <div className="col-md-4 order-md-1 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">My Details</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted"> Id</small>
                <h6 className="my-0">{customer.customerId}</h6>
              </div>
             
            </li>
            
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted">Full Name</small>
                <h6 className="my-0">{customer.fullName}</h6>
              </div>
             
            </li>
          <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted"> Email</small>
                <h6 className="my-0">{customer.email}</h6>
              </div>
             
            </li>
            </ul>
            </div>
            <div className="col-md-8 order-md-2">
              {adminLeftSide(customer)}</div>
              </div>
              

</Base>
      
    );
}
 
export default UserDashboard