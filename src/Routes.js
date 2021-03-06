import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RentalHome from "./pages/RentalHome";
import RentalDetail from "./pages/RentalDetail";
import SecretPage from "pages/SecretPage";
import AuthRoute from "components/auth/AuthRoute";
import GuestRoute from "components/auth/GuestRoute";
import RentalNew from "pages/RentalNew";
import RentalHomeSearch from "pages/RentalHomeSearch";
import ManageBookings from "pages/ManageBookings";
import ManageRentals from "pages/ManageRentals";
import ReceivedBookings from "pages/ReceivedBookings";
import ManageRdv from "pages/ManageRdv";

const Routes = () => {
  return (
    <div className="container bwm-container">
      <Switch>
        <Route exact path="/">
          <RentalHome />
        </Route>
        <Route path="/rentals/:location/homes">
          <RentalHomeSearch />
        </Route>
        <AuthRoute path="/rentals/new">
          <RentalNew />
        </AuthRoute>
        <AuthRoute path="/bookings/manage">
          <ManageBookings />
        </AuthRoute>
        <AuthRoute path="/rdv/manage">
          <ManageRdv />
        </AuthRoute>
        <AuthRoute path="/rentals/manage">
          <ManageRentals />
        </AuthRoute>
        <AuthRoute path="/bookings/received">
          <ReceivedBookings />
        </AuthRoute>
        <Route path="/rentals/:id">
          <RentalDetail />
        </Route>
        {/* <AuthRoute path="/secret" component={SecretPage} /> */}
        <AuthRoute path="/secret">
          <SecretPage />
        </AuthRoute>
        <GuestRoute path="/login">
          <Login />
        </GuestRoute>
        <GuestRoute path="/register">
          <Register />
        </GuestRoute>
      </Switch>
    </div>
  );
};

export default Routes;
