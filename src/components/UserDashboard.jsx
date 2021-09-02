import React from 'react';
import Base from './Base';
import { useDispatch,useSelector } from "react-redux";
import { Link,NavLink } from 'react-router-dom'
import OrderService from "../services/OrderService";
import { useState, useEffect } from 'react';
import BookOrderService from '../services/BookOrderService';
import Hero from './Hero';
import AddressService from '../services/AddressService';


let orderCount;
let addressCount;

const adminLeftSide = (props) => {

  
    return(
      
        <div className="row container-fluid">
    

        <div className="col-lg">
        <NavLink style={{ textDecoration: 'none' }} to="customer/address">    
        <div className="card max-wid rounded-circle shadow mb-2" >
            <div className="box p-2 rounded bg-primary text-center">
              <h1 className="fw-light text-white">{addressCount}</h1>
              <h6 className="text-white"> <i className="fas fa-book"></i> Your Addresses</h6>
            </div>
          </div></NavLink>
        </div>
       
       
    
        <div className="col-lg">
        <NavLink style={{ textDecoration: 'none' }} to={"orderdetails/customer/"+props.customerId}>
             <div className="card max-wid rounded-circle shadow">
            <div className="box p-2 rounded bg-danger text-center">
              <h1 className="fw-light text-white">{orderCount}</h1>
            <h6 className="text-white"><i className="fas fa-users"></i> Your Orders</h6>
            </div>
          </div></NavLink>
        </div>
   
      </div>
       

      
    )
}

const UserDashboard = () => {
  const [orderDetails,setOrderDetails] = useState([]);

  const customer = useSelector((state) => state.customer);
  const [bookOrder,setBookOrder] = useState([]);
  const [address,setAddress] = useState([]);
  
useEffect(() => {
  AddressService.getAddressByCustomerId(customer.customerId).then(res =>{
    setAddress(res.data)
  })
 },[])

  useEffect(() => {
    OrderService.listOrderByCustomer(customer.customerId).then(res =>{
     setOrderDetails(res.data)
    })
   },[])

  orderCount=orderDetails.length
  addressCount=address.length

    return (  
        <Hero   title={"Hello " + customer.fullName} description="Access all your account details here">
          <div className="col-lg-9 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
            
            {/* Customer Details Left Side */}

          <div className="row">
           <div className="col-md-4 order-md-1 mb-4">

          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">My Details</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted"> Your Id</small>
                <h6 className="my-0">{customer.customerId}</h6>
              </div>
             
            </li>
            
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted">Your Name</small>
                <h6 className="my-0">{customer.fullName}</h6>
              </div>
             
            </li>
          <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted">Your Email</small>
                <h6 className="my-0">{customer.email}</h6>
              </div>
             
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted">Your Role</small>
                <h6 className="my-0">{customer.role}</h6>
              </div>
             
            </li>
            </ul>
            <NavLink to="/address/add">
              <button className="btn btn-outline-dark"style={{ textDecoration: 'none',marginRight:"10px" }} >Add New Address</button></NavLink> 
            
              <NavLink to="/customer/details">
              <button className="btn btn-outline-danger "style={{ textDecoration: 'none' }} >Manage Details</button></NavLink>
            </div>

            {/* Customer Navigations */}
            <div className="col-md-8 order-md-2">
              {adminLeftSide(customer)}</div>
              </div>

              </div></div>

</Hero>
      
    );
}
 
export default UserDashboard