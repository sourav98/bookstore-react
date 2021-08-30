
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import Book from './components/Book';
import AdminDashboard from './components/AdminDashboard';
import AddBook from './components/AddBook';

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
   <PrivateRoute exact path="/dashboard" component={UserDashboard}/>
   <PrivateRoute exact path="/orderdetails/customer/:customerId" component={YourOrders}/>
   <Route exact path="/signin" component={Signin}/>
 
   <Route exact path="/" component={Home}/>
   
    </Switch>
     


      
    </div>
  );
}

export default App;
