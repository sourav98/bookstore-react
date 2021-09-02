import React, { Component }from 'react';
import AddressService from '../../services/AddressService';
import BookOrderService from '../../services/BookOrderService';
import Hero from '../Hero';




class UpdateBookOrder extends Component {
  state = {
     bookOrder:{
        customer: {
          customerId: 0,
          email: "string",
          fullName: "string",
          
        },
        orderDate: "string",
        orderId: 0,
        orderTotal: 0,
        paymentMethod: "string",
        recipientName: "string",
        recipientPhone: "string",
        shippingAddress: {
          address: "string",
          addressId: 0,
          city: "string",
          country: "string",
          pincode: "string"
        },
        status: "string"
      },
      bookOrderDto:{
        orderTotal: 0,
        status: "",
        addressId: 0,
        paymentMethod: "",
        recipientName: "",
        recipientPhone: "",


      },
      address:[],
    }
  
  async componentDidMount()
  {
    BookOrderService.getBookOrderById(this.props.match.params.orderId).then((res) => 
    this.setState({bookOrder:res.data}),
    )
    console.log(this.props.match.params.orderId)
    BookOrderService.getBookOrderById(this.props.match.params.orderId).then((res) => 
    this.setState({bookOrderDto:res.data}),
    )
     AddressService.getAddresses().then((res) => 
     this.setState({address:res.data}),
      )
    
  }

  handleChange = (event) => {
    const bookOrderDto = { ...this.state.bookOrderDto };
    bookOrderDto[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ bookOrderDto: bookOrderDto });
  };

  handleSubmit = (event) => {
    // Prevents default behaviour of submit button
    event.preventDefault();
    BookOrderService.updateBookOrder(this.props.match.params.orderId,this.state.bookOrderDto)
      .then((res) => {
        
      })
  };
   

render(){
    return (  
     <Hero title="Add updates "  className="container-fluid p-5" description="Add updated details here">
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
            value={this.state.bookOrderDto.recipientName}
          />
        </div>

        <div className="form-group">
      <label className="col-form-label-md mt-4" >Enter the Receipient Phone No</label>
          <input
            onChange={this.handleChange}
            name="recipientPhone"
            className="form-control"
            placeholder="9722749781"
            value={this.state.bookOrderDto.recipientPhone}
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

} export default UpdateBookOrder;