import React from 'react';
import { NavLink } from "react-router-dom";
import { Link, withRouter } from 'react-router-dom';
import { signOut } from '../actions/customerAction';
import { useDispatch, useSelector } from "react-redux";
const Nav = ({history}) => {

  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
            <img src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
        <b> Book</b>Store
          </NavLink >

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>

          {customer.loggedIn && !customer.admin ?(
          <li className="nav-item">
            <NavLink className="nav-link"to="/books">Books</NavLink >
          </li>):<div>
              </div>
            }

          {customer.loggedIn && !customer.admin ?(
           <li className="nav-item">
           <NavLink className="nav-link"to="/dashboard">User Dashboard</NavLink >
          </li>
          ):( 
            <div>
              </div>
          )}

        
        {customer.loggedIn && customer.admin ?(
           <li className="nav-item">
           <NavLink className="nav-link"to="/admin">Admin Dashboard</NavLink >
          </li>
          ):( 
            <div>
              </div>
          )}

        </ul>
        <div className="text-end">
          {!customer.loggedIn && (
            <li>
            <NavLink className="btn btn-outline-light me-2" to="/signin">Login</NavLink>
            <NavLink to="/" className="btn btn-warning">Register</NavLink>
            </li>
          )}
          {customer.loggedIn && (
          <button className="btn btn-outline-light me-2" onClick={
              () => 
              {
              dispatch(signOut(customer.email)).then((res) => {
          
            });
              history.push("/")
              }
            }>Log Out</button>
          )}
         
           
          </div>
      </div>
    </div>
  </nav>
    );
}
 
export default withRouter(Nav);

