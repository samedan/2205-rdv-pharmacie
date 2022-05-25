/* eslint-disable jsx-a11y/anchor-is-valid */
import RentalSearchInput from "components/rental/RentalSearchInput";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// 'logout' function coming from App.js
const Header = ({ username, isAuth, logout, rentals }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        BookWithMe
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* Search form */}
        {rentals &&
          !rentals.isFetching &&
          // rentals.items.length > 0 &&
          rentals.cities.length > 0 &&
          // rentals.items !== null &&
          rentals.cities !== null && (
            <RentalSearchInput cities={rentals.cities} />
          )}

        {/* Menu items */}
        <ul className="navbar-nav ml-auto">
          {isAuth && (
            <li className="nav-item">
              <div className="nav-link">Welcome, {username}</div>
            </li>
          )}

          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/rdv/manage">
              Manage RDV
            </Link>
          </li>
          {isAuth && (
            <>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Manage
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/rentals/new">
                    New Rental
                  </Link>
                  <Link className="dropdown-item" to="/rentals/manage">
                    Manage Rentals
                  </Link>
                  <Link className="dropdown-item" to="/bookings/manage">
                    Manage Bookings
                  </Link>
                  <Link className="dropdown-item" to="/bookings/received">
                    Received Bookings
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div onClick={logout} className="nav-link">
                  Logout
                </div>
              </li>
            </>
          )}

          {!isAuth && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth: { username, isAuth }, rentals }) => {
  return {
    username: username,
    isAuth: isAuth,
    rentals: rentals,
  };
};

export default connect(mapStateToProps)(Header);
