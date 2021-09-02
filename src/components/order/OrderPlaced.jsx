import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import OrderService from '../../services/OrderService';
import Hero from '../Hero';
const OrderPlaced = (props) => {

    const [orderDetails,setOrderDetails] = useState([])
    const [isLoaded,setisLoaded]=useState(false)

    const viewOrder = () => 
    {
        OrderService.viewOrderById(props.match.params.orderId).then(res => {
            console.log(res)
            setOrderDetails(res.data)
            setisLoaded(true)
        })
    }
    useEffect(() => {
        viewOrder()
    },[])
    console.log(orderDetails)
    return (
        <Hero title="Your Order is Place" description="Your order status will be updated in your dashboard">
            <div className="col-lg-6 combox">
           <div class="h-100  bg-light shadow p-3 mb-5  rounded">
         
        {isLoaded ? (

<div className="row">

<div className="col">

<ul className="list-group mb-3">
     


  <li className="list-group-item d-flex justify-content-between lh-condensed">
    <div>
      
      <small className="text-muted">Customer Name</small>
      <h6 className="my-0">{orderDetails.bookOrder.customer.fullName}</h6>
    </div>
   
  </li>



  <li className="list-group-item d-flex justify-content-between lh-condensed">
    <div>
      
      <small className="text-muted">Book name</small>
      <h6 className="my-0">{orderDetails.book.title}</h6>
    </div>
   
  </li>
  <li className="list-group-item d-flex justify-content-between bg-light">
    <div className="text-secondary">
      <h6 className="my-0">Book Price</h6>
      
    </div>
    <span className="text-secondary"><strong> ₹ </strong>{orderDetails.book.price}</span>
  </li>
  <li className="list-group-item d-flex justify-content-between bg-light">
    <div className="text-secondary">
      <h6 className="my-0">Buy Quantity</h6>
      
    </div>
    <span className="text-secondary"><strong>{orderDetails.quantity}</strong></span>
  </li>

  <li className="list-group-item d-flex justify-content-between bg-light">
    <div className="text-success">
      <h6 className="my-0">Order Total</h6>
      <small>(INR)</small>
    </div>
    <span className="text-success"><strong> ₹ </strong>{orderDetails.orderTotal}</span>
  </li>
 
</ul>
<NavLink to="/books"><button   className="rounded mt-2 btn btn-success form-control">
        <i className="fas fa-book-open"/> Keep Reading
        </button></NavLink> 
</div>
</div>


        ):(<div></div>)}
           </div></div>
        </Hero>
      );
}
 
export default OrderPlaced;