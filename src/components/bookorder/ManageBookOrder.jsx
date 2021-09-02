import React, { Component } from 'react';
import Hero from '../Hero';

class ManageBookOrder extends Component {
    state = {  }
    render() { 
        return (  
            <Hero title="Your Details" description="Update or Delete from here">
                 <div className="col-lg-9 combox">
          <div class="h-100  p-5 bg-light shadow p-3 mb-5  rounded">

          </div></div>
            </Hero>
        );
    }
}
 
export default ManageBookOrder;