import Base from "./Base";
import { Link } from 'react-router-dom'
import BookService from "../services/BookService";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listAllBooks } from "../actions/bookAction";

let bookCount;
let customerCount;

const adminLeftSide = () => {

    return(
        <div className="card">
            <h4 className="card-header bg-dark text-white">
                Admin Navigation
            </h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/create/category">Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/categories">Manage Categories</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/create/book">Add Book</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/books">Manage Books</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/orders">Manage Orders</Link>
                </li>
            </ul>
        </div>
    )
}

const adminRightSide = () => {
  
    
    return(
        <div className="row">
    
       
        <div className="col-md-6 col-lg-3 col-xlg-3">
          <div className="card">
            <div className="box p-2 rounded bg-primary text-center">
              <h1 className="fw-light text-white">{bookCount}</h1>
              <h6 className="text-white">Total Books</h6>
            </div>
          </div>
        </div>
       
        <div className="col-md-6 col-lg-3 col-xlg-3">
          <div className="card">
            <div className="box p-2 rounded bg-success text-center">
              <h1 className="fw-light text-white">5963</h1>
              <h6 className="text-white">Page Views</h6>
            </div>
          </div>
        </div>
    
        <div className="col-md-6 col-lg-3 col-xlg-3">
          <div className="card">
            <div className="box p-2 rounded bg-warning text-center">
              <h1 className="fw-light text-white">10%</h1>
              <h6 className="text-white">Bounce Rate</h6>
            </div>
          </div>
        </div>
      </div>
        // <div className="card">
        //     <h4 className="card-header">Admin Information</h4>
        //     <ul className="list-group ">
        //         <li className="list-group-item ">
        //             <h5><span className="badge  text-dark badge-primary mr-2">Name:</span></h5>
        //         </li>
        //         <li className="list-group-item">
        //             <h5><span className="badge text-dark badge-primary mr-2">Email:</span></h5>
        //         </li>
        //         <li className="list-group-item">
        //             <h5><span className="badge text-dark badge-primary mr-2">Admin </span></h5>
        //         </li>
        //     </ul>
        // </div>
    )
}
const AdminDashboard = () => {
    
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(listAllBooks())
  },[])

  const books = useSelector((state) => state.store.books);


bookCount=books.length;
 
    return ( 
        <Base title="Admin Dashboard" className="container" description="Manage all your products from here">
      <div className="container">
        <div className="row row-cols-md-2 row-cols-md-8">
            <div className="col">
            {adminRightSide()}
          
            </div>
            <div className="col">
            {adminLeftSide()}
            </div>
        </div>
          </div>
        
        </Base>
     );
}
 
export default AdminDashboard;