import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";

const PrivateRoute = ({ component:Component, ...rest }) => {
  const customer = useSelector((state) => state.customer);

  return (
    <Route
      {...rest}
      render={ props =>
        customer.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute