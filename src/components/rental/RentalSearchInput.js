import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { connect } from "react-redux";

const RentalSearchInput = ({ cities }) => {
  const [location, setLocation] = useState([]);
  const [searchTerms, setSearchTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(cities);
    // if (!isFetching) {
    //   console.log(rentals);
    // }
    // if (!rentals.isFetching) {
    //   console.log(cities);
    // }
    // setSearchTerms(rentals);
  }, []);

  const history = useHistory();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      console.log("location", location);
      handleSearch(event.target.value);
      // getAvailableCities();
    }
  };

  const handleSearch = () => {
    console.log("location", location[0]);
    console.log("searchTerms", searchTerms);
    location
      ? history.push(`/rentals/${location[0]}/homes`)
      : history.push("/");
  };

  // console.log(items);

  return (
    <div
      className="form-inline my-2 my-lg-0
    "
    >
      <Typeahead
        id="my-typeahead-id"
        abelKey="name"
        // onChange={(selected) => setLocation(selected)}
        onChange={(selected) => {
          console.log(selected);
          // handleKeyPress(selected);
          setLocation(selected);
          // handleSearch(selected[0]);
        }}
        options={cities}
        // onKeyPress={handleKeyPress}
        selected={location}
      />
      {/* <input
        value={location}
        onKeyPress={handleKeyPress}
        onChange={(e) => setLocation(e.target.value)}
        className="form-control 
        mr-sm-2 
        bwm-search"
        type="search"
        placeholder="Search your desired location"
      /> */}

      <button
        className="btn btn-outline-success my-2 my-sm-0 btn-bwm-main"
        type="button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default RentalSearchInput;
