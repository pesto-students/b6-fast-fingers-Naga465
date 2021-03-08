import React from "react";
import { Route, Redirect } from "react-router-dom";
import useStorage from "../authenticateService";

const RedirectPaths = ["/home"];

const RouteMiddleWare = (props) => {
  const { component: Component, path, token , ...rest } = props;
  if (
   ( RedirectPaths.includes(path) &&
    !token)||
   ( path === "/level" &&
    !rest.gameLevel &&
    !!token)
  ) {
    return <Component {...rest} {...props} />;
  } else {
    return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
  }
};

function RedirectRoute({ component: Component, ...rest }) {
  return (
    <Route
      render={(props) => (
        <RouteMiddleWare component={Component} {...props} {...rest}  />
      )}
    />
  );
}

export default (props) => { 
  return useStorage(props)(RedirectRoute)
}