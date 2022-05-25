import { fetchUserBookings, deleteBooking } from "actions";
import BookingListing from "components/booking/BookingListing";
import React from "react";
import { connect } from "react-redux";

class ManageBookings extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserBookings());
  }

  deleteBooking = (bookingId) => {
    const canDelete = this.askForPermission();
    if (!canDelete) {
      return;
    }
    alert(`Deleting booking with ID: ${bookingId}`);
    this.props.dispatch(deleteBooking(bookingId));
  };

  askForPermission() {
    return window.confirm("Are you sure you want to delete this booking?");
  }

  render() {
    const { bookings, errors, isFetching } = this.props;
    return (
      <BookingListing
        errors={errors}
        isFetching={isFetching}
        bookings={bookings}
        title="My Bookings"
        renderMenu={(bookingId) => (
          <button
            className="btn btn-danger"
            onClick={(event) => this.deleteBooking(bookingId)}
          >
            Delete
          </button>
        )}
      />
    );
  }
}

const mapsStateToProps = ({ manage }) => {
  return {
    bookings: manage.bookings.items,
    isFetching: manage.bookings.isFetching,
    errors: manage.bookings.errors,
  };
};

export default connect(mapsStateToProps)(ManageBookings);
