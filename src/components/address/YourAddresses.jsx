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
  const [error,setError] = useState([]);
    
    useEffect(() => {
      AddressService.getAddressByCustomerId(customer.customerId).then(res =>{
        setAddress(res.data)
        console.log(res.data)
      })
     },[])

     const handleDelete = (addressId) => {
      AddressService.deleteAddress(addressId).then((res) => {
        const addresses = address.filter(
          (add) => add.addressId !== addressId
        );
        setAddress(addresses)
      })
        

    };

return(
    <Hero title="Your Addresses" description="">
    <div className="text-center mt-4 ">
      <Link to="/dashboard" className="rounded btn btn-md btn-primary"> <i className="fas fa-home"></i> Dashboard</Link>
    </div>     
  <div className="row mt-2 p-4 ">

  {address.map((bo) => (
    
    <div className="col-md-4">
    <div className="card bg-light text-white mb-3 ">
    <div class="card-header text-dark">
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
    <center>
    <div className="row mt-2 mb-2">
    <div className="col">

    <Link to={`/address/update/${bo.addressId}`}>
                        <input type="button"
                        className="btn btn-secondary"
                        value="Update"

                        />
                        </Link> 
                        </div>
                        <div className="col">
       <input type="button"
                        className="btn btn-outline-dark"
                        value="Delete"
                        onClick={() => handleDelete(bo.addressId)}
                        />
   </div> </div></center>
     </div></div>
  
  ))}
 
 </div> 
 </Hero> 
  )

}

export default YourAddresses;