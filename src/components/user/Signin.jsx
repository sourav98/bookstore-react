import React from 'react';
import Base from '../Base';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signIn } from '../../actions/customerAction';
import { Link , Redirect} from 'react-router-dom'
const Signn = (props) => {

    const [customer, setCustomer] = useState({
        email: "sourav@bookstore.com",
        password: "123456789",
        didRedirect:false,
      });
      const {email,password,didRedirect} = customer;
    const dispatch = useDispatch();
   

    const handleChange = (event) => {
        const cust= { ...customer };
        cust[event.target.name] = event.target.value;
        setCustomer(cust);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signIn(customer))
        setCustomer({
            ...customer,
            didRedirect:true
        })
      }
      const c = useSelector((state) => state.customer);
      console.log(c.errMsg)
      const performRedirect = () => 
      {
          if(didRedirect) {
              if(c && c.loggedIn && c.admin) {
                 return <Redirect to="/admin" />
              }
              else {
                if(c && c.loggedIn)  {
                    return <Redirect to="/books" />
                 }
                 return <Redirect to="/signin" />
              }
             
          }
    
      }

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
       
        <Base title="Please Sign In" description="Signin to your account here">
              {errorMessage()}
        <div className="row">
                       <div className="col-md-6 offset-sm-3 text-left pb-5">
                           <form onSubmit={handleSubmit}>
                               <div className="form group mb-3">
                                   <label className="text-dark">Email</label>
                                   <input
                                   name="email"
                                    className="form-control"
                                     type="email" 
                                 onChange={handleChange}
                                 value={customer.email}
                                     placeholder="Sourav@shopforcollege.com"
                                      />
                               </div>
                               <div className="form group">
                                   <label className="text-dark">Password</label>
                                   <input className="form-control" 
                                   placeholder="*******" 
                                   onChange={handleChange}
                                   type="password" 
                                   name="password"
                                   value={customer.password}
                                   />
                               </div>
                               <button className="btn btn-success btn-block mt-3">Sign In</button>
                               
                           </form>
                       </div>
                   </div>
                   {performRedirect()}
                   </Base>
     );
}
 
export default Signn;