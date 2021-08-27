import React, { Component } from 'react';
import Base from '../Base';

class Signin extends Component {
    state = {  }
    render() { 
        return ( 
            <Base title="Please Sign In" description="Signin to your account here">
 <div className="row">
                <div className="col-md-6 offset-sm-3 text-left pb-5">
                    <form>
                        <div className="form group mb-3">
                            <label className="text-dark">Email</label>
                            <input
                             className="form-control"
                              type="email" 
                          
                              placeholder="Sourav@shopforcollege.com"
                               />
                        </div>
                        <div className="form group">
                            <label className="text-dark">Password</label>
                            <input className="form-control" 
                            placeholder="*******" 
                        
                            type="password" 
                           
                            />
                        </div>
                        <button className="btn btn-success btn-block mt-3">Sign In</button>
                        
                    </form>
                </div>
            </div>
            </Base>
         );
    }
}
 
export default Signin;