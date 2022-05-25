import React from "react";
import RentalCard from "components/rental/RentalCard";
import { connect } from "react-redux";
import { createRental, fetchRentals } from "actions";
import { withRouter } from "react-router-dom";
import { capitalize } from "helpers/functions";

class RentalHomeSearch extends React.Component {
  componentDidMount() {
    this.getRentals(this.location);
  }

  componentDidUpdate(prevProps) {
    const { location: prevLocation } = prevProps.match.params;
    // if performed Search on the page
    if (this.location !== prevLocation) {
      this.getRentals(this.location);
    }
  }
  getRentals(location) {
    this.props.dispatch(fetchRentals(location));
  }

  renderRentals = (rentals) =>
    rentals.map((rental) => (
      <div key={rental._id} className="col-md-3">
        <RentalCard rental={rental} />
      </div>
    ));
  createRental = () => {
    const uid = Math.random().toString(32).slice(2);
    const newRental = {
      _id: uid,
      title: "Old house in nature",
      city: "Bratislava",
      category: "house",
      image: "http://via.placeholder.com/350x250",
      numOfRooms: 5,
      shared: true,
      description: "Very nice apartment in center of the city.",
      dailyPrice: 23,
    };
    this.props.dispatch(createRental(newRental));
  };

  get location() {
    return this.props.match.params.location;
  }

  get noRentalsFound() {
    const { rentals, isFetching } = this.props;
    return rentals.length === 0 && !isFetching;
  }

  render() {
    const { rentals } = this.props;

    return (
      <div className="card-list">
        <h1>Listing page</h1>
        <h1 className="page-title">
          Your Home in "{capitalize(this.location)}"
        </h1>
        <div className="row">{this.renderRentals(rentals)}</div>
        {this.noRentalsFound && (
          <p className="alert alert-warning">No rentals found. </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ rentals }) => {
  return {
    rentals: rentals.items,
    isFetching: rentals.isFetching,
  };
};

export default connect(mapStateToProps)(withRouter(RentalHomeSearch));
