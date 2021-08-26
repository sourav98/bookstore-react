import React, { Component } from 'react';
import Base from '../../components/Base';
import OrderService from '../../services/OrderService'
class UpdateOrder extends Component {
 
    state = {
            deliveryStatus:""
     }

    handleChange = (event) => {
        const deliveryStatus = { ...this.state.deliveryStatus };
        this.setState({ deliveryStatus: event.target.value });
      };

      handleSubmit = (event) => {
        // Prevents default behaviour of submit button
        event.preventDefault();
        console.log(this.state.deliveryStatus)
        OrderService.updateDeliveryStatus(this.props.match.params.orderDetailsId,this.state.deliveryStatus).then((res) => {
          this.props.history.push("/admin/orders");
        });
      };
    render() { 
        return ( 
            <Base title="Update Order Status"  className="container p-4"  description="Update the order status here">
            <form onSubmit={this.handleSubmit} className="container-fluid" >
            <div className="form-group">
           <label className="col-form-label-md mt-4" >Delivery Status</label>
           <input
                 onChange={this.handleChange}
                 name="deliveryStatus"
                 className="form-control"
                 value={this.state.deliveryStatus}
               />
           </div>
           <button type="submit"  className="rounded mt-2 btn btn-success form-control">
         Update Status
        </button>
           </form>
                 </Base>
         );
    }
}
 
export default UpdateOrder;