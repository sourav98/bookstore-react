
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import Book from './components/Book';
import AdminDashboard from './components/AdminDashboard';
import AddBook from './components/AddBook';
import ManageBooks from './components/ManageBooks';
import ManageOrder from './components/order/ManageOrder';
import PlaceOrder from './components/order/PlaceOrder';
import UpdateOrder from './components/order/UpdateOrder';

function App() {
  return (
    <div className="App">
      <Nav/>
    <Switch>
   <Route path="/books" component={Book}/>
   <Route exact path="/admin" component={AdminDashboard}/>
   <Route exact path="/admin/create/book" component={AddBook}/>
   <Route exact path="/admin/books" component={ManageBooks}/>
   <Route exact path="/admin/orders" component={ManageOrder}/>
   <Route exact path="/admin/orderdetails/:orderDetailsId" component={UpdateOrder}/>
   <Route exact path="/book/:bookId/order" component={PlaceOrder}/>
   
   <Route exact path="/" component={Home}/>
   
    </Switch>
     


      
    </div>
  );
}

export default App;
