import React, { Component } from 'react';
import OrderService from '../../services/OrderService'
import Base from '../../components/Base'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Hero from '../Hero';
const mapStateToProps = state => ({
    customer: state.customer
});

class YourOrders extends Component {
    
    state = { 
        orderDetails:[],
        orderDetailsSearch:[],
        search:"",
        errorMsg:""
     }
    async componentDidMount()
    {
    OrderService.listOrderByCustomer(this.props.customer.customerId).then((res) => {
       this.setState({orderDetails:res.data})
       this.setState({orderDetailsSearch:res.data})}
       ).catch(error => {this.setState({errorMsg:error.response.data.message })})
    }

    handleSearch = (event) => {
      console.log("handleSearch");
      this.setState({ search: event.target.value });
      
      const filteredOd = this.state.orderDetailsSearch.filter(
        (od) =>
        od.title.toLowerCase().startsWith(event.target.value.toLowerCase())
      );
      this.setState({ orderDetails: filteredOd });
    };

    handleDelete = (id) => {
      OrderService.cancelOrder(id).then((res) => {
        const orderDetails = this.state.orderDetails.filter((od) => od.orderDetailsId != id);
        this.setState({ orderDetails });
      });
    };

    
    errorMessage = () => 
    {
        return(
            <div className="row">
            <div className="col">
        <div className="alert alert-danger"  style={{display:this.state.errorMsg ? "" : "none"}}>
        <i className="fas fa-exclamation-triangle"></i>  {this.state.errorMsg}
        </div>
        </div>
        </div>

        )}  

    render() { 
        return ( 
       
            <Hero title="Your Orders"  className="container p-4"  description="Manager your orders here">
                <div className="col-lg-9 combox">
      <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
              {
              this.state.errorMsg ? (<div>
{this.errorMessage()}
              </div>):
              (<div>
<Link to="/dashboard" className="rounded btn btn-md btn-primary"> <i className="fas fa-user"/> User Home</Link>
         { console.log(this.state.orderDetailsSearch)} 
         {    console.log(this.props.customer)}
           <div className=" mt-4 card text-dark bg-light">
           
           <div className="card-header ">
             <div className="row">
               <div className="col-8">
               <i className="fas fa-chart-bar"/> My Order List
               </div>   
               <div className="col-4">
               <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search By Book"
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
    <th scope="col">Customer Id</th>
    <th scope="col">Book Id</th>
    <th scope="col">Book Title</th>
   
    <th scope="col">Book Price</th>
    <th scope="col">Order Quantity</th>
    <th scope="col">Order Total</th>
    <th scope="col">Delivery Status</th>
    <th scope="col">Cancel Order</th>
    {console.log(this.state.orderDetails)}
    </tr>
    </thead>
    <tbody>
{this.state.orderDetails && this.state.orderDetails.map((order) => (

        <tr>
         
           <td>{this.props.customer.customerId}</td>
           <td>{order.bookId}</td>
           <td>{order.title}</td>
           <td>{order.price}</td>
           <td>{order.quantity}</td>
           <td>{order.orderTotal}</td>
           <td>{order.deliveryStatus}</td>
           <td>  <button onClick ={() => this.handleDelete(order.orderDetailsId)}  className=" rounded btn btn-danger">
    Cancel
            </button></td>

        </tr>

))}

   </tbody>
</table>      </div>
 </div>
            
            </div>
       

              </div>)
            
            }
         
           
            </div></div>
       </Hero>
         );
    }
}
 
export default connect(mapStateToProps)(YourOrders);