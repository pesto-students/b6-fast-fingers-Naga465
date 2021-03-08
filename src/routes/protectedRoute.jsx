import React from "react";
import { Redirect, Route } from "react-router-dom";
import useStorage from "../authenticateService";


function ProtectedRoute({ component: Component, token , ...rest }) {
 return (
    <Route
      {...rest}
      render={(props) => {
        return !!token ? (
          !rest.gameLevel ? (
            <Redirect
              to={{ pathname: "/level", state: { from: props.location } }}
            />
          ) : (
            <Component {...props} {...rest} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}

export default (props) => { 
  return useStorage(props)(ProtectedRoute)
}
