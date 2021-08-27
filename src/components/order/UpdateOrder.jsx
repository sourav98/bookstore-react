import React, { Component } from 'react';
import Base from '../../components/Base';
import OrderService from '../../services/OrderService'
class UpdateOrder extends Component {
 
    state = 
    {
      orderDetailsUpdateDto :
    {
           book:{
             title:"",
             bookId:"",
             price:""
           },
           bookOrder:
           {
            shippingAddress:
             {
                address:"",
                city:"",
                pincode:""
             },
             customer :
             {
               customerId:"",
               fullName:""
             }
           },
            deliveryStatus: "",
            orderTotal:"",
            quantity:""
     }
    }

    async componentDidMount()
    {
      OrderService.viewOrderById(this.props.match.params.orderDetailsId).then((res) => 
       this.setState({orderDetailsUpdateDto:res.data})
       )
    }
    handleChange = (event) => {
        const orderDetailsUpdateDto = { ...this.state.orderDetailsUpdateDto };
        orderDetailsUpdateDto[event.target.name]=event.target.value;
        this.setState({ orderDetailsUpdateDto:orderDetailsUpdateDto});
      };

      handleSubmit = (event) => {
        // Prevents default behaviour of submit button
        event.preventDefault();
        //console.log(this.state.deliveryStatus)
       
        OrderService.updateOrder(this.props.match.params.orderDetailsId,this.state.orderDetailsUpdateDto)
        .then((res) => {
          this.props.history.push("/admin/orders");
        });
      };
    
    render() { 
        return ( 
            <Base title="Update Order Status"  className="container p-4"  description="Update the order status here">
         <div className="row">
          <div className="col-md-4 order-md-1 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Order Details</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
               
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                
                <small className="text-muted">Customer Id</small>
                <h6 className="my-0">{this.state.orderDetailsUpdateDto.bookOrder.customer.customerId}</h6>
              </div>
             
            </li>

            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                
                <small className="text-muted">Customer Name</small>
                <h6 className="my-0">{this.state.orderDetailsUpdateDto.bookOrder.customer.fullName}</h6>
              </div>
             
            </li>

            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                
                <small className="text-muted">Customer Location</small>
                <h6 className="my-0">{this.state.orderDetailsUpdateDto.bookOrder.shippingAddress.address}</h6>
              </div>
             
            </li>

            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                
                <small className="text-muted">Customer City</small>
                <h6 className="my-0">{this.state.orderDetailsUpdateDto.bookOrder.shippingAddress.city}</h6>
              </div>
             
            </li>

            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                
                <small className="text-muted">Customer Pincode</small>
                <h6 className="my-0">{this.state.orderDetailsUpdateDto.bookOrder.shippingAddress.pincode}</h6>
              </div>
             
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                
                <small className="text-muted">Book name</small>
                <h6 className="my-0">{this.state.orderDetailsUpdateDto.book.title}</h6>
              </div>
             
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-secondary">
                <h6 className="my-0">Book Price</h6>
                
              </div>
              <span className="text-secondary"><strong> ₹ {this.state.orderDetailsUpdateDto.book.price}</strong></span>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-secondary">
                <h6 className="my-0">Buy Quantity</h6>
                
              </div>
              <span className="text-secondary"><strong>{this.state.orderDetailsUpdateDto.quantity}</strong></span>
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Order Total</h6>
                <small>(INR)</small>
              </div>
              <span className="text-success"><strong> ₹ {this.state.orderDetailsUpdateDto.orderTotal}</strong></span>
            </li>
           
          </ul>

        </div>
        <div className="col-md-8 order-md-2">
            <form onSubmit={this.handleSubmit}  >
            <div className="form-group">
           <label className="col-form-label-md mt-4" >Delivery Status</label>
           <input
                 onChange={this.handleChange}
                 name="deliveryStatus"
                 className="form-control"
                 value={this.state.orderDetailsUpdateDto.deliveryStatus}
               />
           </div>
         
           <button type="submit"  className="rounded mt-2 btn btn-success form-control">
         Update Status
        </button>
           </form>
           </div>
           </div>
                 </Base>
         );
    }
}
 
export default UpdateOrder;