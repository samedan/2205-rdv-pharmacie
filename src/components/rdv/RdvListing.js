import React from "react";
import { Link } from "react-router-dom";
import { capitalize, formatDate } from "helpers/functions";
import ApiErrors from "components/forms/ApiErrors";

const RdvListing = ({
  rdv,
  type,
  title = "Rdv I've made",
  renderMenu,
  errors,
  isFetching,
}) => {
  return (
    <section className="booking-listing">
      <h1 className="page-title">{title}</h1>
      {!isFetching && rdv.length === 0 && (
        <p className="alert alert-warning">No RDVs created</p>
      )}
      <ApiErrors errors={errors} />
      <div className="row">
        {/* Iterate Bookings */}
        {rdv.map((rdv) => (
          <div className="col-md-4" key={rdv._id}>
            <div className="card text-center">
              {/* Only if 'received' booking */}
              {type === "received" && (
                <div className="card-header">
                  From: <i>{/* {rdv.user.username} */}</i>
                </div>
              )}

              <div className="card-block">
                <h4 className="card-title">
                  {rdv.specialite}
                  {/* - {capitalize(rdv.rental.city)} */}
                </h4>
                <p className="card-text booking-days">
                  Date/Heure : {formatDate(rdv.date)}
                </p>
                <p className="card-text">
                  <span>Créé le: </span>{" "}
                  <span className="booking-price-value">
                    {formatDate(rdv.createdAt)}{" "}
                  </span>
                </p>
                <Link
                  to={{ pathname: `/rdv/${rdv._id}` }}
                  className="btn btn-bwm-main"
                >
                  Go to RDV
                </Link>
                {renderMenu && renderMenu(rdv._id)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RdvListing;
