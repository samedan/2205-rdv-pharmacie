import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RentalAssets = () => (
  <div>
    <div className="rental-assets">
      <h3 className="title">Assets</h3>
      <div className="row">
        <div className="col-md-6">
          <span>
            {/* <i className="fa fa-asterisk"></i> Cooling */}
            <FontAwesomeIcon icon="asterisk" color="cadetblue" /> Cooling
          </span>
          <span>
            {/* <i className="fa fa-thermometer"></i>  */}
            <FontAwesomeIcon icon="thermometer" color="cadetblue" /> Heating
          </span>
          <span>
            {/* <i className="fa fa-location-arrow"></i>  */}
            <FontAwesomeIcon icon="tshirt" color="cadetblue" /> Iron
          </span>
        </div>
        <div className="col-md-6">
          <span>
            {/* <i className="fa fa-desktop"></i> */}
            <FontAwesomeIcon icon="laptop-house" color="cadetblue" /> Working
            area
          </span>
          <span>
            {/* <i className="fa fa-cube"></i>  */}
            <FontAwesomeIcon icon="hand-sparkles" color="cadetblue" /> Washing
            machine
          </span>
          <span>
            {/* <i className="fa fa-cube"></i>  */}
            <FontAwesomeIcon icon="sink" color="cadetblue" /> Dishwasher
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default RentalAssets;
