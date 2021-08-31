import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddressService from '../../services/AddressService';
import Base from '../Base';

class AddressCustomer extends Component {
    state = {
        addresses: [],
        addressesSearch:[],
        search: "",
      };
    async componentDidMount()
    {
    AddressService.getAddressCustomer().then((res) => {
       this.setState({addresses:res.data})
       this.setState({addressesSearch:res.data})}
      
       )
    }


    handleSearch = (event) => {
        console.log("handleSearch");
        this.setState({ search: event.target.value });
        
        const filteredAddresses = this.state.addressesSearch.filter(
          (add) =>
          add.fullName.toLowerCase().startsWith(event.target.value.toLowerCase())
        );
        this.setState({ addresses: filteredAddresses });
      };
     

    render() { 
        return (
            <Base title="Manage Addresses" description="All addresses based on customers" className="container p-4" >
            <div className=" mt-4 card text-dark bg-light">
            <div className="card-header ">
            <div className="row">

              <div className="col-8">
              <i className="fas fa-address-book"/> Address List By Customer
              </div>   
              
              <div className="col-4">
               <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search By Customer"
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
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Pincode</th>
            </tr>
        </thead>
        <tbody>
            {this.state.addresses.map(address => (
                <tr>
                    <td>{address.customerId}</td>
                    <td>{address.fullName}</td>
                    <td>{address.address}</td>
                    <td>{address.city}</td>
           
                    <td>{address.pincode}</td>
                  
                </tr>
            ))}
        </tbody>
    </table> 
    </div></div></div>
    </Base>
    );
    }
}
 
export default AddressCustomer;