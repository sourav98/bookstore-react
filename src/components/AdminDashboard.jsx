import Base from "./Base";
import { Link } from 'react-router-dom'
import BookService from "../services/BookService";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listAllBooks } from "../actions/bookAction";
import { listAllCustomers } from "../actions/customerAction";
import OrderService from "../services/OrderService";
import Hero from "./Hero";

let bookCount;
let customerCount;
let orderCount;
const adminLeftSide = () => {

    return(
        <div className="card ">
            <h5 className="card-header bg-dark text-white">
                <i className="fas fa-directions"/>  Navigation
            </h5>
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
                    <Link className="nav-link text-primary " to="/admin/address"><i className="fas fa-address-book"/> Manage Address</Link>
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
    
      <div className="row justify-content-center">
    
      
      <div className="col-lg mb-2">
        <div className="card rounded-circle shadow">
          <div className="box p-2 rounded bg-primary text-center">
            <h1 className="fw-light text-white">{bookCount}</h1>
            <h6 className="text-white"> <i className="fas fa-book"></i> Total Books</h6>
          </div>
        </div>
      </div>
     
      <div className="col-lg  mb-2">
        <div className="card rounded-circle shadow">
          <div className="box p-2 rounded bg-success text-center">
            <h1 className="fw-light text-white"> {orderCount >0?orderCount:0}</h1>
            <h6 className="text-white"> <i className="fas fa-chart-bar"></i> Total Orders</h6>
           
          </div>
          
        </div>
        
      </div>
  
      <div className="col-lg  mb-2">
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
  
  const [orderDetails,setOrderDetails] = useState([]);
  
  const dispatch = useDispatch();

  useEffect(() => {
   OrderService.listAllOrders().then(res =>{
    setOrderDetails(res.data)
   })
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
orderCount=orderDetails.length

    return ( 
      
        <Hero title="Admin Dashboard" description="Manage all your products from here">
          <div className="col-lg-9 combox">
          <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
          
         <div className="row p-2" >
            <div className="col-md-4">
            {adminLeftSide()}
          
            </div>
            <div className="col-md-8 mt-2">
            {adminRightSide()}
            </div>
           </div>
          </div>
          </div>
        </Hero>
     );
}
 
export default AdminDashboard;