import Base from "./Base";
import { Link } from 'react-router-dom'
import BookService from "../services/BookService";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listAllBooks } from "../actions/bookAction";
import { listAllCustomers } from "../actions/customerAction";

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
    
       
        <div className="col-md-6 col-lg-4 col-xlg-3">
          <div className="card">
            <div className="box p-2 rounded bg-primary text-center">
              <h1 className="fw-light text-white">{bookCount}</h1>
              <h6 className="text-white">Total Books</h6>
            </div>
          </div>
        </div>
       
        <div className="col-md-6 col-lg-4 col-xlg-3">
          <div className="card">
            <div className="box p-2 rounded bg-success text-center">
              <h1 className="fw-light text-white">123</h1>
              <h6 className="text-white">Total Orders</h6>
            </div>
          </div>
        </div>
    
        <div className="col-md-6 col-lg-4 col-xlg-3">
          <div className="card">
            <div className="box p-2 rounded bg-danger text-center">
              <h1 className="fw-light text-white">{customerCount}</h1>
              <h6 className="text-white">Users</h6>
            </div>
          </div>
        </div>
      </div>
    )
}
const AdminDashboard = () => {
    
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(listAllBooks())
     dispatch(listAllCustomers())
  },[])

  const books = useSelector((state) => state.store.books);
  const customers = useSelector((state) => state.customer.customers);

console.log(customers)
bookCount=books.length;
 customerCount=customers.length-1;
 
    return ( 
        <Base title="Admin Dashboard" className="container" description="Manage all your products from here">
      <div className="container  mt-4">
        <div className="row row-cols-md-2 row-cols-md-8">
            <div className="col">
            {adminLeftSide()}
          
            </div>
            <div className="col">
            {adminRightSide()}
            </div>
        </div>
          </div>
        
        </Base>
     );
}
 
export default AdminDashboard;