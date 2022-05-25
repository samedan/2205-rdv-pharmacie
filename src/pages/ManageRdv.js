import { fetchUserRdv, deleteRdv } from "actions";
import RdvListing from "components/rdv/RdvListing";
import React from "react";
import { connect } from "react-redux";

class ManageRdv extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRdv());
  }

  deleteRdv = (rdvId) => {
    const canDelete = this.askForPermission();
    if (!canDelete) {
      return;
    }
    alert(`Deleting booking with ID: ${rdvId}`);
    this.props.dispatch(deleteRdv(rdvId));
  };

  askForPermission() {
    return window.confirm("Are you sure you want to delete this RDV?");
  }

  render() {
    const { rdv, bookings, errors, isFetching } = this.props;
    return (
      <RdvListing
        errors={errors}
        isFetching={isFetching}
        rdv={rdv}
        title="My RDVs"
        renderMenu={(rdvId) => (
          <button
            className="btn btn-danger"
            onClick={(event) => this.deleteRdv(rdvId)}
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
    rdv: manage.rdv.items,
    isFetching: manage.rdv.isFetching,
    errors: manage.rdv.errors,
  };
};

export default connect(mapsStateToProps)(ManageRdv);
