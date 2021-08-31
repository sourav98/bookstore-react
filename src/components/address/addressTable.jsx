import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class AddressTable extends Component {
    render() { 
        return (
            <div className=" mt-4 card text-dark bg-light">
            <div className="card-header ">
            <div className="row">
              <div className="col-9">
              <i className="fas fa-chart-bar"/> Address List
              </div>   
             <div className="col-3"> <NavLink to="/admin/address/customer"><button className="btn btn-success">Filter By Customer</button></NavLink> 
             </div>

            </div>
           
 
            </div>
            <div className="card-body">
            <div class="table-responsive"> 
 <table className="table table-striped mt-4 ">
        <thead>
            <tr>
            <th>Address ID</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Pincode</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {this.props.addresses.map(address => (
                <tr>
                    <td>{address.addressId}</td>
                    <td>{address.address}</td>
                    <td>{address.city}</td>
                    <td>{address.country}</td>
                    <td>{address.pincode}</td>
                    <td>
                        <Link to={`/address/update/${address.addressId}`}>
                        <input type="button"
                        className="btn btn-primary"
                        value="Update"

                        />
                        </Link>
                        <input type="button"
                        className="btn btn-secondary ms-1"
                        value="Delete"
                        onClick={() => this.props.handleDelete(address.addressId)}
                        />
                    </td>
                </tr>
            ))}
        </tbody>
    </table> 
    </div></div></div>
    );
    }
}
 
export default AddressTable;