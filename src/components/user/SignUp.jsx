import React from 'react';
import Base from '../Base';
import Hero from '../Hero';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerCustomer } from '../../actions/customerAction';
import { Link , Redirect} from 'react-router-dom'

const SignUp = (props) => {

    const [customer, setCustomer] = useState({
        fullName: "abc",
        email: "abc@gmail.com",
        password: "123456789",
        didRedirect:false,
      });
      const {fullName,email,password,didRedirect} = customer;
    const dispatch = useDispatch();
   

    const handleChange = (event) => {
        const cust= { ...customer };
        cust[event.target.name] = event.target.value;
        setCustomer(cust);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(registerCustomer(customer))
        setCustomer({
            ...customer,
            didRedirect:true
        })
        props.history.push("/signin");
      }
      const c = useSelector((state) => state.customer);
      console.log(c.errMsg)
      

      const errorMessage = () => 
      {
          return(
              <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger"  style={{display:c.errMsg ? "" : "none"}}>
             {c.errMsg}
          </div>
          </div>
          </div>

          )}      

    return ( 
       
        <Hero title="Please Sign Up" description="Register a new account here.">
             <div className="col-lg-5 combox">
      <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
              {errorMessage()}
              
        
                       
                           <form onSubmit={handleSubmit}>
                           <div className="form group mb-3">
                                   <label className="text-dark">Full Name</label>
                                   <input
                                   name="fullName"
                                    className="form-control"
                                     type="text" 
                                 onChange={handleChange}
                                 value={customer.fullName}
                                     placeholder="abc"
                                      />
                               </div>
                               <div className="form group mb-3">
                                   <label className="text-dark">Email</label>
                                   <input
                                   name="email"
                                    className="form-control"
                                     type="email" 
                                 onChange={handleChange}
                                 value={customer.email}
                                     placeholder="abc@xyz.com"
                                      />
                               </div>
                               <div className="form group">
                                   <label className="text-dark">Password</label>
                                   <input className="form-control" 
                                   placeholder="password" 
                                   onChange={handleChange}
                                   type="password" 
                                   name="password"
                                   value={customer.password}
                                   />
                               </div>
                               <button className="btn btn-success form-control btn-block mt-3">Sign Up</button>
                               
                           </form>
                       </div>
                   
                </div>
                   </Hero>
     );
}
 
export default SignUp;