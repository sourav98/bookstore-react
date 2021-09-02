
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';

import AdminDashboard from './components/AdminDashboard';


import ManageOrder from './components/order/ManageOrder';
import PlaceOrder from './components/order/PlaceOrder';
import UpdateOrder from './components/order/UpdateOrder';
import Books from './components/book/Books';
import ManageBook from './components/book/ManageBook';
import Signin from './components/user/Signin';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import UserDashboard from './components/UserDashboard';
import YourOrders from './components/order/YourOrders';
import AddAddress from './components/address/AddAddress';
import YourAddresses from './components/address/YourAddresses';
import AddBook from './components/book/AddBook';
import Address from './components/address/address';
import AddressCustomer from './components/address/addressCustomer';
import AddBookOrder from './components/bookorder/AddBookOrder';

import Hero from './components/Hero';
import ManageBookOrder from './components/bookorder/ManageBookOrder';
import SignUp from './components/user/SignUp';
import AddCategory from './components/category/addCategory';
import UpdateBookOrder from './components/bookorder/UpdateBookOrder';
import Category from './components/category/category';
import UpdateCategory from './components/category/updateCategory';
import UpdateAddress from './components/address/UpdateAddress';


function App() {
  return (
    <div className="App">
      <Nav/>
    <Switch>
   <Route path="/books" component={Books}/>

   <AdminRoute exact path="/admin" component={AdminDashboard}/>
   <AdminRoute exact path="/admin/create/book" component={AddBook}/>
   <AdminRoute exact path="/admin/books" component={ManageBook}/>
   <AdminRoute exact path="/admin/orders" component={ManageOrder}/>
   <AdminRoute exact path="/admin/orderdetails/:orderDetailsId" component={UpdateOrder}/>
   <PrivateRoute exact path="/book/:bookId/order" component={PlaceOrder}/>
   <PrivateRoute exact path="/details/new" component={AddBookOrder}/>
   <PrivateRoute exact path="/customer/address" component={YourAddresses}/>
 

   <PrivateRoute exact path="/dashboard" component={UserDashboard}/>
   <PrivateRoute exact path="/orderdetails/customer/:customerId" component={YourOrders}/>
   <PrivateRoute exact path="/address/add" component={AddAddress}/>
   <PrivateRoute exact path="/customer/details" component={ManageBookOrder}/>
   <PrivateRoute exact path="/bookorder/:orderId" component={UpdateBookOrder}/>

   <AdminRoute exact path="/admin/address" component={Address}/>
   <AdminRoute exact path="/admin/address/customer" component={AddressCustomer}/>
    <AdminRoute path ="/admin/create/category" component={AddCategory}/>
    <Route path="/admin/categories" component={Category}/>
    <AdminRoute path ="/category/update/:categoryId" component={UpdateCategory}/>
    
    
    <PrivateRoute exact path="/address/update/:addressId" component={UpdateAddress}/>

  
   <Route exact path="/signin" component={Signin}/>
   <Route exact path="/signup" component={SignUp}/>
   <Route exact path="/head" component={Hero}/>
 
   <Route exact path="/" component={Home}/>
   
    </Switch>
     


      
    </div>
  );
}

export default App;
