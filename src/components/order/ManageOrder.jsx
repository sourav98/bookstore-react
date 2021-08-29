import React, { Component } from 'react';
import OrderService from '../../services/OrderService'
import Base from '../../components/Base'
import { Link } from 'react-router-dom';
class ManageOrder extends Component {
    state = { 
        orderDetails:[]
     }
    async componentDidMount()
    {
    OrderService.listAllOrders().then((res) => 
       this.setState({orderDetails:res.data}),
       
       )
    }


    render() { 
        return ( 
        
            <Base title="Manage Orders"  className="container p-4"  description="Cancel and delete the orders here">
           <Link to="/admin" className="rounded btn btn-md btn-info">Admin Home</Link>

           <div className=" mt-4 card text-dark bg-light">
           
           <div className="card-header">
             Order List
             </div>
           <div className="card-body">
           <div class="table-responsive"> 
<table className="table table-bordered table-striped mt-4 ">
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
    <td> <button  className=" rounded btn btn-danger">
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
       

       </Base>
         );
    }
}
 
export default ManageOrder;