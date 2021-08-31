import React from 'react';
import Base from '../Base';
import BookOrderService from '../../services/BookOrderService';
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import OrderService from '../../services/OrderService'
import AddAddress from '../address/AddAddress';
import BookService from '../../services/BookService';
import './order.css'
const PlaceOrder = (props) => {
  
    const [orderDetails,setOrderDetails] = useState({
        orderId:"",
        quantity:"",
        bookId:props.match.params.bookId
    });

    const customer = useSelector((state) => state.customer);
    const [bookOrder,setBookOrder] = useState([]);
    const [book,setBook] = useState([]);

    const preLoad = () => {
        BookService.viewBook(props.match.params.bookId).then(res =>{
            setBook(res.data)
    })
}

    useEffect(() => 
    {
     preLoad()
       },[])

   
    useEffect(() => {
        BookOrderService.getBookOrderByCustomer(customer.customerId).then(res =>{
            setBookOrder(res.data)
        })
       },[])

    const   handleChange = (event) => {
        const od = { ...orderDetails };
        od[event.target.name] = event.target.value;
        setOrderDetails(od);
      };

      const handleSubmit = (event) => {
        // Prevents default behaviour of submit button
        event.preventDefault();
        OrderService.addOrder(orderDetails)
          .then((res) => {
            props.history.push("/dashboard");
          })
          console.log(orderDetails)
      };
       
       
    return ( <Base title="Place Your Order"  className="container p-4"  description="Fill the details and order now">
          
          <div className="row">
           <div className="col-md-4 order-md-1 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Added Order</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted">Book Title</small>
                <h6 className="my-0">{book.title}</h6>
              </div>
             
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted">Book Price</small>
                <h6 className="my-0">{book.price}</h6>
              </div>
             
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted">Book Author</small>
                <h6 className="my-0">{book.author}</h6>
              </div>
             
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                
                <small className="text-muted">Quantity</small>
                <h6 className="my-0">{orderDetails.quantity}</h6>
              </div>
             
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-warning">
                
                <small className="text-muted">Order Total</small>
                <h6 className="my-0">{parseInt(orderDetails.quantity*book.price)}</h6>
              </div>
             
            </li>
       
            </ul>
            </div>

            {/* Right Side */}
            <div className="col-md-8 order-md-2">
            <form className="container-fluid" onSubmit={handleSubmit}  >
       
      <form>
      <div className="form-group mt-4">
     
      <input
      className="btn btn-success"
      type="button"
      value="Add New Address"
     
    />

          </div> </form>
      
       
      <div className="form-group">
      <label className="col-form-label-md mt-4 lead mb-2" >Choose Your Address</label>
      <select
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
            name="orderId"
          >
            <option>Select</option>
            {bookOrder && 
            bookOrder.map((bo,index)=> (
             
                  <option key={index} className="lead text-capitalize" value={bo.orderId}>{bo.shippingAddress.address},{bo.shippingAddress.city}
                  ,{bo.shippingAddress.pincode}
                  </option>
                 
            ))}
          </select>
      </div>
  

      <div className="form-group">
      <label className="col-form-label-md mt-4 lead mb-2" >Enter the Quantity</label>
      <input
            onChange={handleChange}
            name="quantity"
            className="form-control"
            placeholder="Quantity"
            type="number"
            value={orderDetails.quantity}
          />
      </div>
      <button type="submit"  className="rounded mt-2 btn btn-success form-control">
         Place Order
        </button>
      </form>
              
              </div>
              </div>
          
          
    </Base> );
}
 
export default PlaceOrder;