const { combineReducers } = require("redux");
const { createList } = require("./common");

const initManageReducer = () => {
  return combineReducers({
    rentals: createList("manage-rentals"),
    bookings: createList("manage-bookings"),
    rdv: createList("manage-rdv"),
    receivedBookings: createList("received-bookings"),
  });
};

const manage = initManageReducer();

export default manage;
