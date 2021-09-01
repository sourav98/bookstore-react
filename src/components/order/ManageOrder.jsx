import React, { Component } from 'react';
import OrderService from '../../services/OrderService'
import Base from '../../components/Base'
import { Link } from 'react-router-dom';
import Hero from '../Hero';
class ManageOrder extends Component {
    state = { 
        orderDetails:[],
        orderDetailsSearch:[],
        search:""
     }
    async componentDidMount()
    {
    OrderService.listAllOrders().then((res) => {
       this.setState({orderDetails:res.data})
       this.setState({orderDetailsSearch:res.data})}
       )
    }

    handleSearch = (event) => {
      console.log("handleSearch");
      this.setState({ search: event.target.value });
      
      const filteredOd = this.state.orderDetailsSearch.filter(
        (od) =>
        od.bookOrder.customer.fullName.toLowerCase().startsWith(event.target.value.toLowerCase())
      );
      this.setState({ orderDetails: filteredOd });
    };

    handleDelete = (id) => {
      OrderService.cancelOrder(id).then((res) => {
        const orderDetails = this.state.orderDetails.filter((od) => od.orderDetailsId != id);
        this.setState({ orderDetails });
      });
    };

    render() { 
        return ( 
       
            <Hero title="Manage Orders"   description="Cancel and delete the orders here">
              <div className="col-lg-10 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
            
           <Link to="/admin" className="rounded btn btn-md btn-primary"> <i className="fas fa-user-lock"/> Admin Home</Link>
         { console.log(this.state.orderDetailsSearch)} 
           <div className=" mt-4 card text-dark bg-light">
           
           <div className="card-header ">
             <div className="row">
               <div className="col-8">
               <i className="fas fa-chart-bar"/> Order List
               </div>   
               <div className="col-4">
               <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search By Customer"
              value={this.state.search}
              onChange={this.handleSearch}
                
                />
              <span className="input-group-text border-0">
                <i className="fas fa-search"></i>
  </span>
</div>
</div>
             </div>
            
  
             </div>
           <div className="card-body">
           <div class="table-responsive"> 
<table className="table table-striped mt-4 ">
  <thead>
    <tr>
    <th scope="col">Order Id</th>
    <th scope="col">Book Id</th>
    <th scope="col">Customer Id</th>
    <th scope="col">Customer Name</th>
    <th scope="col">Book Name</th>
    <th scope="col">Order Status</th>
    <th scope="col">Update Order Status</th>
    <th scope="col">Cancel Order</th>
    </tr>
    </thead>
    <tbody>
{this.state.orderDetails && this.state.orderDetails.map((order) => (

        <tr>
            <td>{order.orderDetailsId}</td>
           <td>{order.book.bookId}</td>
           <td>{order.bookOrder.customer.customerId}</td>
           <td>{order.bookOrder.customer.fullName}</td>
           <td>{order.book.title}</td>
           <td>{order.deliveryStatus}</td>
           <td> <Link to={`/admin/orderdetails/${order.orderDetailsId}`}
              className="rounded btn btn-success">
              <span className="">Update</span>
            </Link></td>
    <td> <button onClick ={() => this.handleDelete(order.orderDetailsId)}  className=" rounded btn btn-danger">
    Cancel
            </button></td>
        </tr>

))}

   </tbody>
</table>      </div>
 </div>
            <div className="card-footer">
     
            </div>
            </div>
            </div>  </div>

       </Hero>
         );
    }
}
 
export default ManageOrder;