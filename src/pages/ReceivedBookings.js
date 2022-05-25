import { fetchReceivedBookings } from "actions";
import BookingListing from "components/booking/BookingListing";
import React from "react";
import { connect } from "react-redux";

class ReceivedBookings extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchReceivedBookings());
  }

  render() {
    const { bookings, isFetching, errors } = this.props;
    console.log("received bookings", bookings);
    return (
      <BookingListing
        bookings={bookings}
        title="Received Bookings on my Rentals"
        type="received"
        errors={errors}
        isFetching={isFetching}
      />
    );
  }
}

const mapsStateToProps = ({ manage }) => {
  return {
    bookings: manage.receivedBookings.items,
    isFetching: manage.receivedBookings.isFetching,
    errors: manage.receivedBookings.errors,
  };
};

export default connect(mapsStateToProps)(ReceivedBookings);
