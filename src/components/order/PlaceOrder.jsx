import React, { Component } from 'react';
import Base from '../../components/Base';
import BookService from '../../services/BookService';
import BookOrderService from '../../services/BookOrderService';
class PlaceOrder extends Component {
    state = { 
        orderDetails:{
            bookId:"",
            orderId:"",
            bookOrder:[],
            quantity:"",
            
        }
     }
   
     async componentDidMount()
     {
        BookOrderService.getAllBookOrders().then((res) => 
        this.setState({bookOrder:res.data})
        )
     }


    handleChange = (event) => {
        const orderDetails = { ...this.state.orderDetails };
        orderDetails[event.target.name] = event.target.value;
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({ orderDetails: orderDetails });
      };
  
    render() { 
        return ( 
            <Base title="Place Your Order"  className="container p-4"  description="Fill the details and order now">
       
       <form className="container-fluid" >
       <div className="form-group">
      <label className="col-form-label-md mt-4" >Book Id</label>
      <input
            onChange={this.handleChange}
            name="bookId"
            disabled
            className="form-control"
            
            type="number"
            value={this.props.match.params.bookId}
          />
      </div>

      <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Quantity</label>
      <input
            onChange={this.handleChange}
            name="quantity"
            className="form-control"
            placeholder="Quantity"
            type="number"
            value={this.state.orderDetails.quantity}
          />
      </div>
      </form>
            </Base>
         );
    }
}
 
export default PlaceOrder;