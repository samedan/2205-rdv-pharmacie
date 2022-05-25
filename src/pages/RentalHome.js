import React from "react";
import RentalCard from "components/rental/RentalCard";
import { connect } from "react-redux";
import { createRental, fetchRentals, readCitiesRentals } from "actions";

class RentalHome extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRentals());
    this.props.dispatch(readCitiesRentals());
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

  render() {
    const { rentals } = this.props;

    return (
      <div className="card-list">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">{this.renderRentals(rentals)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rentals: state.rentals.items,
    cities: state.rentals.cities,
  };
};

export default connect(mapStateToProps)(RentalHome);
