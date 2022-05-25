import React from "react";
import RentalAssets from "./RentalAssets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "helpers/functions";

const RentalInfo = ({ rental }) => (
  <div className="rental">
    <h2 className={`rental-type type-${rental.category}`}>
      {rental.shared ? "Shared" : "Whole"} {rental.category}
    </h2>
    {rental.owner && (
      <div className="rental-owner">
        <img
          src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjc5MS10YW5nLTM1LnBuZw.png?s=aLxshBxLcykO2UAnr6F0Nzhqtdx6iR6UuKi4bFSTzC8"
          alt="owner"
        />
        <span>
          <strong>Owner:</strong>
          <br /> {rental.owner.username}
        </span>
      </div>
    )}

    <h1 className="rental-title">{rental.title}</h1>

    <h2 className="rental-city">{capitalize(rental.city)}</h2>
    <div className="rental-room-info">
      <span>
        {/* <i className="fa fa-building"></i> */}
        <FontAwesomeIcon icon="building" color="blue" /> {rental.numOfRooms}{" "}
        bedrooms
      </span>

      <span>
        <FontAwesomeIcon icon="users" color="green" /> {rental.numOfRooms + 4}{" "}
        {/* <i className="fa fa-user"></i>  */}
        guests
      </span>

      <span>
        <i className="fa fa-bed"></i>
        <FontAwesomeIcon icon="bed" color="red" /> {rental.numOfRooms + 2} beds
      </span>
    </div>

    <p className="rental-description">{rental.description}</p>
    <hr />
    <RentalAssets />
  </div>
);

export default RentalInfo;
