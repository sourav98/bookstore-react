import React from 'react';
import BookOrderService from '../../services/BookOrderService';
import Base from '../Base';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Hero from '../Hero';
import AddressService from '../../services/AddressService';


const YourAddresses = (props) => 
{
    const customer = useSelector((state) => state.customer);
    const [bookOrder,setBookOrder] = useState([]);
  const [address,setAddress] = useState([]);
    
    useEffect(() => {
      AddressService.getAddressByCustomerId(customer.customerId).then(res =>{
        setAddress(res.data)
      })
     },[])

return(
    <Hero title="Your Addresses" description="">
    <div className="text-center mt-4 ">
      <Link to="/dashboard" className="rounded btn btn-md btn-primary"> <i className="fas fa-home"></i> Dashboard</Link>
    </div>     
  <div className="row mt-2 p-4 ">

  {address.map((bo) => (
    
    <div className="col-md-4">
    <div className="card bg-secondary text-white ">
    <div class="card-header">
      Address
    </div>
    <ul class="list-group list-group-flush">
                <li class="list-group-item"><div>
                 <small className="text-muted">Location</small>
                <h6 className="my-0">{bo.address}</h6>
              </div></li>

              <li class="list-group-item"><div>
                 <small className="text-muted">City</small>
                <h6 className="my-0">{bo.city}</h6>
              </div></li>

              <li class="list-group-item"><div>
                 <small className="text-muted">Country</small>
                <h6 className="my-0">{bo.country}</h6>
              </div></li>

              <li class="list-group-item"><div>
                 <small className="text-muted">Pincode</small>
                <h6 className="my-0">{bo.pincode}</h6>
              </div></li>
 

  
    </ul>

    
     </div></div>
  
  ))}
 
 </div> 
 </Hero> 
  )

}

export default YourAddresses;