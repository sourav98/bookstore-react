import React from 'react';
import BookOrderService from '../../services/BookOrderService';
import Base from '../Base';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const YourAddresses = (props) => 
{
    const customer = useSelector((state) => state.customer);
    const [bookOrder,setBookOrder] = useState([]);
    
  useEffect(() => {
    BookOrderService.getBookOrderByCustomer(customer.customerId).then(res =>{
      setBookOrder(res.data)
    })
   },[])

return(
    <Base title="Your Addresses" description="">
        
  <div className="justify-content-center row row-cols-1 row-cols-md-3 g-4">

  {bookOrder.map((bo) => (
    
    <div className="col">
    <div className="card bg-secondary text-white ">
    <div class="card-header">
      Address
    </div>
    <ul class="list-group list-group-flush">
                <li class="list-group-item"><div>
                 <small className="text-muted">Location</small>
                <h6 className="my-0">{bo.shippingAddress.address}</h6>
              </div></li>

              <li class="list-group-item"><div>
                 <small className="text-muted">City</small>
                <h6 className="my-0">{bo.shippingAddress.city}</h6>
              </div></li>

              <li class="list-group-item"><div>
                 <small className="text-muted">Country</small>
                <h6 className="my-0">{bo.shippingAddress.country}</h6>
              </div></li>

              <li class="list-group-item"><div>
                 <small className="text-muted">Pincode</small>
                <h6 className="my-0">{bo.shippingAddress.pincode}</h6>
              </div></li>
 

  
    </ul>

    
     </div></div>
  
  ))}
 
 </div>  <div className="text-center mt-4 ">
 <Link to="/dashboard" className="rounded btn btn-md btn-primary"> <i className="fas fa-home"></i> Dashboard</Link></div>
 </Base> 
  )

}

export default YourAddresses;