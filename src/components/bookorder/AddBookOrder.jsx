import React, { Component }from 'react';
import AddressService from '../../services/AddressService';
import BookOrderService from '../../services/BookOrderService';
import Hero from '../Hero';
import { connect } from 'react-redux';
import Joi from "../../../node_modules/joi-browser/dist/joi-browser";

const mapStateToProps = state => ({
  customer: state.customer
});

class AddBookOrder extends Component {
  state = {
     bookOrder:{
      orderTotal:0,
      status:"placed",
      addressId:"",
      paymentMethod:"",
      recipientName:"",
      recipientPhone:"",
      customerId: this.props.customer.customerId,
    
     } ,
     address:[],
     errors:{},
     errMsg:"",
    }
  
  schema={
    orderTotal:Joi.number(),
    status : Joi.string(),
    addressId:Joi.number().required(),
    paymentMethod:Joi.string(),
    recipientName: Joi.string().min(3).required(),
    recipientPhone: Joi.string().length(10).required(),
    customerId:Joi.number(),
  }  

  validate = () => {
    const errors ={};
    const result = Joi.validate(this.state.bookOrder , this.schema , {
    abortEarly : false,
  });
  console.log(result);

  if(result.error !== null){
    for (let err of result.error.details){
      errors[err.path[0]] = err.message;
    }
  }

  return Object.keys(errors).length === 0? null :errors;
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
    
    const errors = this.validate(); // null / errors
    // Set state error object with errors or empty object based on
    // errors return by the validate() method
    this.setState({ errors: errors || {} });
    // if errors exists in the form , return to the login page
    //console.log(errors);
   
    if (errors) return;
    BookOrderService.addBookOrder(this.state.bookOrder)
      .then((res) => {
        this.props.history.goBack();
      }).catch((error) => this.setState({ errMsg: error.response.data.message }));
      console.log(this.state.errMsg)
  };
   

render(){
    return (  
     <Hero title="Add New Details"  className="container-fluid p-5" description="Add new details here">
               <div className="col-lg-9 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
           {this.state.errMsg && (
          <div className="alert alert-danger" role="alert">
            {this.state.errMsg}
          </div>
        )}
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
       
        </div>{this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.addressId}
                </p>
              )}
        
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
        {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.recipientName}
                </p>
              )}

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
        {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.recipientPhone}
                </p>
              )}

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
        {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.paymentMethod}
                </p>
              )}

        <button type="submit"  className="rounded mt-2 btn btn-success form-control">
         Add Details
        </button>

        </form>    </div>    </div>
     </Hero>
    );
}

} export default connect(mapStateToProps)(AddBookOrder);