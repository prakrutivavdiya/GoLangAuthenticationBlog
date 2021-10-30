import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = (props) => {
  let token=localStorage.getItem('token');
  return (
    <Route
      path={props.path}
      render={() =>
         token!==null ? (
          <props.component></props.component>
        ) : (
          alert("Please Login First"),
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    />
  );
};

export default AuthRoute;