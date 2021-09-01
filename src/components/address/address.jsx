import React, { Component } from "react";

import { Link } from "react-router-dom";
import AddressService from "../../services/AddressService";
import Base from "../Base";
import Hero from "../Hero";
import AddressTable from "./addressTable";
class Address extends Component {
  state = {
    addresses: [],
    filteredAddresses: [],
    search: "",
  };
  componentDidMount() {
    AddressService.getAddresses().then((res) =>
      this.setState({ addresses: res.data })
    );

    AddressService.getAddresses().then((res) =>
    this.setState({ filteredAddresses: res.data })
  );
   
  }

  handleDelete = (addressId) => {
    AddressService.deleteAddress(addressId).then((res) => {
      const addresses = this.state.addresses.filter(
        (add) => add.addressId !== addressId
      );
      this.setState({ addresses });
    });
  };

  handleSearch = (event) => {
    console.log("handleSearch");
    this.setState({ search: event.target.value });
    if(event.target.value==""){
      const filteredAddrs = this.state.filteredAddresses;
      this.setState({ addresses: filteredAddrs });
   
    }
    else{
      const filteredAddrs = this.state.addresses.filter(
        (add) =>
        
          add.city.toLowerCase().startsWith(event.target.value.toLowerCase()));
          this.setState({ addresses: filteredAddrs });
    }

  };

  render() {
    return (
      <Hero title="Manage Address"  description="Address Database">
          <div className="col-lg-9 combox">
           <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">
            
        <div className="mt-3 mx-auto">
      
        <div className="d-flex justify-content-end">
          <div>
            <form>
              <input
                type="search"
                className="form-control"
                placeholder="Search by City"
                value={this.state.search}
                onChange={this.handleSearch}
              />
            </form>
          </div>
          <div>
            <Link to="/address/add">
              <input
                type="button"
                className="btn btn-success mb-3 ms-3"
                value="Add"
              />
            </Link>
          </div>
        </div>
          <AddressTable
            addresses={this.state.addresses}
            handleDelete={this.handleDelete}
          />
        </div>
        </div>
        </div>
      </Hero>
    );
  }
}
export default Address;