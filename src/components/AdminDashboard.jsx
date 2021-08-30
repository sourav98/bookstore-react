import Base from "./Base";
import { Link } from 'react-router-dom'
import BookService from "../services/BookService";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listAllBooks } from "../actions/bookAction";
import { listAllCustomers } from "../actions/customerAction";
import OrderService from "../services/OrderService";
let bookCount;
let customerCount;

const adminLeftSide = () => {

    return(
        <div className="card">
            <h4 className="card-header bg-dark text-white">
                <i className="fas fa-user-lock"/> Admin Navigation
            </h4>
            <ul className="list-group">
                <li className="list-group-item list-group-item-action">
                    <Link className="nav-link text-primary " to="/admin/create/category"><i className="fas fa-list"/> Create Category</Link>
                </li>
                <li className="list-group-item list-group-item-action">
                    <Link className="nav-link text-primary" to="/admin/categories"><i className="fas fa-list-alt"/>  Manage Categories</Link>
                </li>
                <li className="list-group-item list-group-item-action">
                    <Link className="nav-link text-primary" to="/admin/create/book"><i className="fas fa-book-medical"/> Add Book</Link>
                </li>
                <li className="list-group-item list-group-item-action">
                    <Link className="nav-link text-primary " to="/admin/books"><i className="fas fa-swatchbook"/> Manage Books</Link>
                </li>
                <li className="list-group-item list-group-item-action">
                    <Link className="nav-link text-primary" to="/admin/orders"><i className="fas fa-chart-bar"/> Manage Orders</Link>
                </li>
            </ul>
        </div>
    )
}

const adminRightSide = () => {
  
    
    return(
    
      <div className="row">
    
      
      <div className="col-md-6 col-lg-4 col-xlg-3">
        <div className="card rounded-circle shadow">
          <div className="box p-2 rounded bg-primary text-center">
            <h1 className="fw-light text-white">{bookCount}</h1>
            <h6 className="text-white"> <i className="fas fa-book"></i> Total Books</h6>
          </div>
        </div>
      </div>
     
      <div className="col-md-6 col-lg-4 col-xlg-3">
        <div className="card rounded-circle shadow">
          <div className="box p-2 rounded bg-success text-center">
            <h1 className="fw-light text-white"> 123</h1>
            <h6 className="text-white"> <i className="fas fa-chart-bar"></i> Total Orders</h6>
           
          </div>
          
        </div>
        
      </div>
  
      <div className="col-md-6 col-lg-4 col-xlg-3">
        <div className="card rounded-circle shadow">
          <div className="box p-2 rounded bg-danger text-center">
            <h1 className="fw-light text-white">{customerCount}</h1>
            <h6 className="text-white"><i className="fas fa-users"></i> Users</h6>
          </div>
        </div>
      </div>
    </div>

    )
}

const AdminDashboard = () => {
  
  const [orderDetails,setOrderDetails] = useState();
  
  const dispatch = useDispatch();

  useEffect(() => {
   OrderService.listAllOrders().then(res =>{
    setOrderDetails(res.data)
   },[])
   

  },[])
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