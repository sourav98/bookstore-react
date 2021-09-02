import React, { Component }from 'react';
import AddressService from '../../services/AddressService';
import BookOrderService from '../../services/BookOrderService';
import Hero from '../Hero';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  customer: state.customer
});

class AddBookOrder extends Component {
  state = {
     bookOrder:{
      orderTotal:"",
      status:"placed",
      addressId:"",
      paymentMethod:"",
      recipientName:"",
      recipientPhone:"",
      customerId: this.props.customer.customerId,
    
     } ,
     address:[],
    }
  
  async componentDidMount()
  {
    AddressService.getAddresses().then((res) => 
    this.setState({address:res.data}),
     )
  }

  handleChange = (event) => {
    const bookOrder = { ...this.state.bookOrder };
    bookOrder[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ bookOrder: bookOrder });
  };

  handleSubmit = (event) => {
    // Prevents default behaviour of submit button
    event.preventDefault();
    BookOrderService.addBookOrder(this.state.bookOrder)
      .then((res) => {
        this.props.history.goBack();
      })
  };
   

render(){
    return (  
     <Hero title="Add New Details"  className="container-fluid p-5" description="Add new details here">
               <div className="col-lg-9 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
         
         <form className="container-fluid" onSubmit={this.handleSubmit} >
      <div className="form-group">
        <label className="col-form-label-md mt-4" >Choose from Exisitng Address</label>
          <select
            onChange={this.handleChange}
            className="form-control"
            placeholder="Address"
            name="addressId"
          >
            <option>Select</option>
            {this.state.address && 
            this.state.address.map((ad,index)=> (
             
                  <option key={index} className="text-capitalize" value={ad.addressId}  name="addressId">{ad.address},{ad.city},{ad.pincode}</option>
                 
            ))}
          </select>
       
        </div>
        
        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Receipient Name</label>
          <input
            onChange={this.handleChange}
            name="recipientName"
            className="form-control"
            placeholder="Receipient Name"
            value={this.state.bookOrder.recipientName}
          />
        </div>

        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Receipient Phone No</label>
          <input
            onChange={this.handleChange}
            name="recipientPhone"
            className="form-control"
            placeholder="9722749781"
            value={this.state.bookOrder.recipientPhone}
          />
        </div>

        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Payment Method</label>
           <select
            onChange={this.handleChange}
            className="form-control"
            placeholder="paymentMethod"
            name="paymentMethod"
          >
            <option>Select</option>
            
           <option className="text-capitalize" value="CASH"  >CASH</option>
           <option className="text-capitalize" value="CARD"  >CARD</option>     
            
          </select>
        </div>

        <button type="submit"  className="rounded mt-2 btn btn-success form-control">
         Add Details
        </button>

        </form>    </div>    </div>
     </Hero>
    );
}

} export default connect(mapStateToProps)(AddBookOrder);