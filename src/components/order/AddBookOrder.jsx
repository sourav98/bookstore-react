import React from 'react';
import Base from '../Base';
import BookOrderService from '../../services/BookOrderService';
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import AddAddress from '../address/AddAddress';

const AddBookOrder = (props) => {

    const [isOpen, setIsOpen] = useState(false);
  
    const customer = useSelector((state) => state.customer);

    const [bookOrder,setBookOrder] =  useState({
        customerId:customer.customerId,
        paymentMethod:"",
        recipientName:"",
        recipientPhone:"",
        status:"",
        orderTotal:"",
        addressId:""
    });

    const   handleChange = (event) => {
        const bo = { ...bookOrder };
        bo[event.target.name] = event.target.value;
        setBookOrder(bo);
      };

       
    useEffect(() => {
        BookOrderService.getBookOrderByCustomer(customer.customerId).then(res =>{
            setBookOrder(res.data)
        })
       })

       const handleSubmit = (event) => {
        // Prevents default behaviour of submit button
        event.preventDefault();
        BookOrderService.addBookOrder(bookOrder)
          .then((res) => {
            // props.history.push("/dashboard");
          })
          console.log(bookOrder)
      };

    return (  
        <Base className="container p-4" title="Start your checkout" description="Add your shipping address and other details">
                 <form className="container-fluid" onSubmit={handleSubmit}   >
                 <div className="form-group mt-4">
     
     <input
     className="btn btn-success"
     type="button"
     value="Add New Address"
     />
         </div> 

      <div className="form-group">
      <label className="col-form-label-md mt-4" >Choose Your Address</label>
      <select
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
            name="addressId"
          >
            <option>Select</option>
            {bookOrder && 
            bookOrder.map((bo,index)=> (
             
                  <option key={index} className="text-capitalize" value={bo.orderId}>{bo.shippingAddress.address},{bo.shippingAddress.city}
                  ,{bo.shippingAddress.pincode}
                  </option>
                 
            ))}
          </select>
      </div>
       <div className="form-group">
      <label className="col-form-label-md mt-4" >Receipient Phone</label>

      <input
            onChange={handleChange}
            name="receipientPhone"
            
            className="form-control"
            value={bookOrder.receipientPhone}
          />   
      </div>

      <div className="form-group">
      <label className="col-form-label-md mt-4" >Payment Method</label>

      <input
            onChange={handleChange}
            name="paymentMethod"
            
            className="form-control"
            value={bookOrder.paymentMethod}
          />   
      </div>

      <div className="form-group">
      <label className="col-form-label-md mt-4" >Receipient Name</label>

      <input
            onChange={handleChange}
            name="receipientName"
            
            className="form-control"
            value={bookOrder.receipientName}
          />   
      </div>

      <div className="form-group">
      <label className="col-form-label-md mt-4" >Status</label>

      <input
            onChange={handleChange}
            name="status"
            
            className="form-control"
            value={bookOrder.status}
          />   
      </div>
      <button type="submit"  className="rounded mt-3 btn btn-success ">
         Proceed
        </button>
      
       
      </form>
        </Base>
    );
}
 
export default AddBookOrder;