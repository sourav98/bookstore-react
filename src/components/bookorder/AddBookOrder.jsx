import React from 'react';
import Base from '../Base';
import { useState, useEffect } from 'react';
import AddressService from '../../services/AddressService';
import { useDispatch,useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import BookOrderService from '../../services/BookOrderService';
import Hero from '../Hero';

const AddBookOrder = () => {
    const history = useHistory();

    const customer = useSelector((state) => state.customer);
    const [address,setAddress] = useState([]);

    const [bookOrder,setBookOrder] = useState({
        customerId:customer.customerId,
        paymentMethod:"",
        recipientName:"",
        recipientPhone:"",
        status:"Success",
        addressId:"",
        orderTotal:0
    });
  
    useEffect(() => {
        AddressService.getAddressByCustomerId(customer.customerId).then(res =>{
            setAddress(res.data)
        })
       },[])

       const   handleChange = (event) => {
        const bo = { ...bookOrder };
        bo[event.target.name] = event.target.value;
        setBookOrder(bo);
      };

     const handleSubmit = (event) => {
        // Prevents default behaviour of submit button
        event.preventDefault();
        BookOrderService.addBookOrder(bookOrder)
        console.log(bookOrder)
        history.goBack();
        
      };
  

    return (  
     <Hero title="Add New Details"  className="container-fluid p-5" description="Add new details here">
               <div className="col-lg-9 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
         
         <form className="container-fluid" onSubmit={handleSubmit} >
      <div className="form-group">
        <label className="col-form-label-md mt-4" >Choose from Exisitng Address</label>
          <select
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
            name="addressId"
          >
            <option>Select</option>
            {address && 
            address.map((ad,index)=> (
             
                  <option key={index} className="text-capitalize" value={ad.addressId}  name="addressId">{ad.address},{ad.city},{ad.pincode}</option>
                 
            ))}
          </select>
        {console.log(address)}
        </div>
        
        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Receipient Name</label>
          <input
            onChange={handleChange}
            name="recipientName"
            className="form-control"
            placeholder="Receipient Name"
            value={bookOrder.recipientName}
          />
        </div>

        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Receipient Phone No</label>
          <input
            onChange={handleChange}
            name="recipientPhone"
            className="form-control"
            placeholder="9722749781"
            value={bookOrder.recipientPhone}
          />
        </div>

        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Payment Method</label>
          <input
            onChange={handleChange}
            name="paymentMethod"
            className="form-control"
            placeholder="CASH"
            value={bookOrder.paymentMethod}
          />
        </div>

        <button type="submit"  className="rounded mt-2 btn btn-success form-control">
         Add Details
        </button>

        </form>    </div>    </div>
     </Hero>
    );
}
 
export default AddBookOrder;