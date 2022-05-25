import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";

const AuthRoute = ({ children, ...rest }) => {
  const authService = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.isAuthenticated() ? (
          React.cloneElement(children, { ...rest, ...props })
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default AuthRoute;
