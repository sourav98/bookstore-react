import React, { Component } from 'react';
import Hero from '../Hero';
import BookOrderService from '../../services/BookOrderService';
import { Link } from 'react-router-dom';
import UseAnimations from 'react-useanimations';
import edit from 'react-useanimations/lib/edit';
import search from 'react-useanimations/lib/searchToX';
import trash2 from 'react-useanimations/lib/trash2'
class ManageBookOrder extends Component {
    state ={
        bookOrders:[],
        filteredBookOrders:[],
        search:"",
    };
    componentDidMount() {
        BookOrderService.getAllBookOrders().then((res) => 
        this.setState({ bookOrders : res.data })
        );
    }

  handleDelete = (id) => {
        
        BookOrderService.deleteBookOrder(id).then((res) => {
          const bookOrders = this.state.bookOrders.filter((bo) => bo.orderId != id);
          this.setState({ bookOrders });
        });
      };
    
  handleSearch = (event) => {
        
        console.log("handleSearch");
      this.setState({ search: event.target.value });
    if(event.target.value==""){
      const filteredBookOrders = this.state.bookOrders;
      this.setState({ bookOrders: filteredBookOrders });
   
    }
    else{
      const filteredBookOrders = this.state.bookOrders.filter(
        (bo) =>
        
          bo.recipientName.toLowerCase().startsWith(event.target.value.toLowerCase()));
          this.setState({ bookOrders: filteredBookOrders });
    }
      };

  render() { 
        return (  
            <Hero title="Your Details" description="Update or Delete from here">
                 <div className="col-lg-9 combox">
          <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
           
          <div className=" mt-4 card text-dark bg-light">
                
                <div className="card-header ">
                  <div className="row">
                    <div className="col-8">
                    <i className="fas fa-chart-bar"/> Book Order List
                    </div>   
                    <div className="col-4">
                    <div className="input-group rounded">
                   <input type="search" className="form-control rounded" placeholder="Search By Name"
                   value={this.state.search}
                   onChange={this.handleSearch}
                     
                     />
                   <button className="input-group-text border-0">
                   <UseAnimations animation={search} size={30}  /> 
       </button>
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
         <th scope="col">Order Date</th>
        
         <th scope="col">Recipient Name</th>
         <th scope="col">Recipient Phone</th>
         <th scope="col">Payment Method</th>
         <th scope="col">Update </th>
         <th scope="col">Delete </th>
         </tr>
         </thead>
         <tbody>
     {this.state.bookOrders && this.state.bookOrders.map((order) => (
     
             <tr>
                 <td>{order.orderId}</td>
                <td>{order.orderDate}</td>
               
                <td>{order.recipientName}</td>
                <td>{order.recipientPhone}</td>
                <td>{order.paymentMethod}</td>
                <td> <Link to={`/bookorder/${order.orderId}`}
                   > <button
                   className="rounded btn btn-primary">
                   <UseAnimations animation={edit} size={28} autoplay={true} loop={true} speed={0.4} /></button>
                 </Link></td>
         
             <td>
              <button
              className="rounded btn btn-danger"
              onClick={() => this.props.handleDelete(order.orderId)}
            ><UseAnimations animation={trash2} size={28}   /></button></td>
            </tr>
     
     ))}
     
        </tbody>
     </table>      </div>
      </div>
                 <div className="card-footer">
          
                 </div>
                 </div>
               

          </div></div>
            </Hero>
        );
    }
}
 
export default ManageBookOrder;