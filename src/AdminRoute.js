import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";

const AdminRoute = ({ component:Component, ...rest }) => {
  const customer = useSelector((state) => state.customer);

  return (
    <Route
      {...rest}
      render={ props =>
        customer.loggedIn && customer.admin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute