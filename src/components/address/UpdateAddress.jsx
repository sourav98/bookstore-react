import React, { Component } from 'react';
import AddressService from '../../services/AddressService';
import Joi from "joi-browser";
import Base from '../Base';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import Hero from '../Hero';

const mapStateToProps = state => ({
  customer: state.customer
});

class AddAddress extends Component {
    state = { 
    
        address:{
          //  customerId:this.props.customer.customerId,
            addressId: this.props.match.params.addressId,
            address: "",
            city: "",
            country: "",
            pincode: "",
          
        },
        errors: {},
        errMsg: "",
     };

     componentDidMount(){
        AddressService.getAddressById(this.props.match.params.addressId).then((res) => 
        this.setState({ address : res.data })
        );
     }

     schema = {
      // customerId:Joi.required(),
        addressId: Joi.number().required(),
        address: Joi.string().min(3).max(30).alphanum().required(),
        city: Joi.string().min(3).alphanum().required(),
        country: Joi.string().min(1).alphanum().required(),
        pincode: Joi.number().min(100000).max(1000000).required(),
      };
      validate = () => {
        const errors = {};
        // Validate account details with schema
        const result = Joi.validate(this.state.address1, this.schema, {
          abortEarly: false,
        });
        console.log(result);
    
        // Initialize error object with errors, if validate method returns errors
        if (result.error !== null) {
          for (let err of result.error.details) {
            errors[err.path[0]] = err.message;
          }
        }
    
        // return null if no errors otherwise return errors
        return Object.keys(errors).length === 0 ? null : errors;
      };

      

     handleChange = (event) => {
         const address = {...this.state.address};
         address[event.target.name] = event.target.value;
         console.log(event.target.name);
         console.log(event.target.value);
         this.setState({address: address});        
     };

     handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        console.log(errors);
        if (errors) return;
        AddressService.updateAddress(this.state.address).then((res) =>{
          this.props.history.push("/customer/address")
        }).catch((error) => this.setState({ errMsg: error.response.data.message }));
     };
    render() { 
        return (
          <Hero title="Update Address"   description="Update your addresses here">
            <div className="col-md-6 combox">
          <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
            <div className="mx-auto  border p-3"> 
            {this.state.errMsg && (
            <div className="alert alert-danger" role="alert">
            {this.state.errMsg}
            </div>
            )}  
       
            <form onSubmit={this.handleSubmit} >
                    {/* <div className="mb-3 mt-2 text-start">
                        <label for="addressId">Address ID</label>
                        <input type="text" 
                        className="form-control" 
                        id="addressId" 
                        name="addressId"
                        value={this.state.address.addressId} 
                        onChange={this.handleChange}/>
                          {this.state.errors && (
                <p className="text-danger font-monospace text-start">
                  {this.state.errors.addressId}
                </p>
              )}
                    </div> */}
                    
                    <div className="mb-3 mt-2 text-start">
                        <label for="address">Address</label>
                        <input type="text"
                         className="form-control" 
                         id="address" 
                         name="address"
                         value={this.state.address.address} 
                         autoFocus 
                         placeholder="Enter Address"
                         onChange={this.handleChange}/>
                         {this.state.errors && (
                        <p className="text-danger font-monospace text-start">
                        {this.state.errors.address}
                        </p>)}
                    </div>
                    <div className="mb-3 mt-2 text-start">
                        <label for="city">City</label>
                        <input type="text" 
                        className="form-control" 
                        id="city" 
                        name="city"
                        value={this.state.address.city} 
                        placeholder="Enter City"
                        onChange={this.handleChange}/>
                        {this.state.errors && (
                        <p className="text-danger font-monospace text-start">
                        {this.state.errors.city}
                        </p>)}
                    </div>
                    <div className="mb-3 mt-2 text-start">
                        <label for="country">Country</label>
                        <input type="text" 
                        className="form-control" 
                        id="country" 
                        name="country"
                        value={this.state.address.country} 
                        placeholder="Enter Country"
                        onChange={this.handleChange}/>
                        {this.state.errors && (
                        <p className="text-danger font-monospace text-start">
                        {this.state.errors.country}
                        </p>)}
                    </div>
                    <div className="mb-3 mt-2 text-start">
                        <label for="pincode">Pincode</label>
                        <input type="text" 
                        className="form-control" 
                        id="pincode" 
                        name="pincode"
                        value={this.state.address.pincode} 
                        placeholder="Enter Pincode"
                        onChange={this.handleChange}/>
                        {this.state.errors && (
                        <p className="text-danger font-monospace text-start">
                        {this.state.errors.pincode}
                        </p>)}
                    </div>
                    <button type="submit" class="btn btn-success">Add</button>
                </form></div></div>
                </div></Hero>
         );
    }
}
 
export default connect(mapStateToProps)(AddAddress);