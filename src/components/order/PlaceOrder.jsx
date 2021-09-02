import React from 'react';
import Base from '../Base';
import BookOrderService from '../../services/BookOrderService';
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import OrderService from '../../services/OrderService'
import AddAddress from '../address/AddAddress';
import BookService from '../../services/BookService';
import './order.css'
import AddBookOrder from '../bookorder/AddBookOrder';
import { NavLink, useHistory } from 'react-router-dom';
import Hero from '../Hero';
const PlaceOrder = (props) => {

    const history = useHistory();
    
    const[errorMsg,setErrorMsg]=useState("")
  
    const [orderDetails,setOrderDetails] = useState({
        orderId:"",
        quantity:"1",
        bookId:props.match.params.bookId,
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
          .catch((error) => setErrorMsg("Choose your details to proceed"))
        
      };

     const errorMessage = () => 
      {
          return(
              <div className="row">
              <div className="col">
          <div className="alert alert-danger"  style={{display:errorMsg ? "" : "none"}}>
            <i className="fas fa-exclamation-triangle"></i> {errorMsg}
          </div>
          </div>
          </div>
  
          )}  
       
       
    return ( <Hero title="Place Your Order"  className="container p-4"  description="Fill the details and order now">
    
          <div className="col-lg-10 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
            
          <div className="row">
          {errorMessage()}
           <div className="col-md-4 order-md-1 mt-4">
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
          
       
 
      <div className="form-group mt-4 float-end">
      <button onClick={() => history.push("/details/new",{from :"PlaceOrder"})} className="rounded mt-2 btn  btn-outline-success form-control">
        <i className="fas fa-plus"/> Add New Details
        </button>
    

          </div> 
          <form className="container-fluid" onSubmit={handleSubmit}  >
       <br/>
     
       <p className="lead mt-2">
            
       Choose Your Details
        </p>
        <div className="row mt-2">
      {bookOrder && 
            bookOrder.map((bo,index)=> (

    <div className="col col-md-6">
    <div className="card card-body bg-light d-flex flex-row justify-content-between align-items-center">
      <div className="form-check">
        <label>
          <input 
            name={bo.orderId}
            onChange={handleChange} value={bo.orderId} type="radio"  name="orderId"  class="form-check-input" id={bo.orderId}/>
            <div>
                <small className="text-muted">Name</small>
                <h6 className="my-0">{bo.recipientName}  </h6>
              </div>
              <div>
                <small className="text-muted">Phone No</small>
                <h6 className="my-0"> {bo.recipientPhone}  </h6>
              </div>
              <div>
                <small className="text-muted">Payment Method</small>
                <h6 className="my-0">{bo.paymentMethod}  </h6>
              </div>
              <div>
                <small className="text-muted">Address</small>
                <h6 className="my-0">{bo.shippingAddress.address} , {bo.shippingAddress.city} , {bo.shippingAddress.pincode}  </h6>
              </div>
      
          </label>   </div>
      </div><br/>
    </div>

            ))}
   </div>
  
      <div className="form-group">
      <label className="col-form-label-md mt-4 lead mb-2" >Enter the Quantity</label>
      <input
            onChange={handleChange}
            name="quantity"
            className="form-control"
            placeholder="Quantity"
            type="number"
            min="1"
            value={orderDetails.quantity}
          />
      </div>
      <button type="submit"  className="rounded mt-2 btn btn-success form-control">
        <i className="fas fa-shopping-cart"/> Place Order
        </button>
      </form>
              
              </div>
              </div>
   
              </div>   </div>
    </Hero> );
}
 
export default PlaceOrder;