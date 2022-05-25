import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";

const GuestRoute = ({ children, ...rest }) => {
  const authService = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        !authService.isAuthenticated() ? (
          React.cloneElement(children, { ...rest, ...props })
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                message: "You are logged in",
              },
            }}
          />
        )
      }
    />
  );
};

export default GuestRoute;
