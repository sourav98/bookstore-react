import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
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
                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link"to="/books">Books</NavLink >
                  </li>
                   <li className="nav-item">
                    <a className="nav-link" href="#">Cart</a>
                  </li>
                
                </ul>
                <div className="text-end">
                    <a href="#" className="btn btn-outline-light me-2">Login</a>
                    <a href="#" className="btn btn-warning">Register</a>
                  </div>
              </div>
            </div>
          </nav>
        );
   }
}
 
export default Nav;