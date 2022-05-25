import { combineReducers } from "redux";
import { isFetchingReducer } from "./common";

const initRentalsReducer = () => {
  const items = (state = [], action) => {
    switch (action.type) {
      case "FETCH_RENTALS":
        return action.rentals;
      case "CREATE_RENTAL":
        return [...state, action.rental];
      default:
        return state;
    }
  };
  const cities = (state = [], action) => {
    switch (action.type) {
      case "READ_ALL_CITIES":
        return action.cities;

      default:
        return state;
    }
  };

  const isFetching = isFetchingReducer("rentals");

  return combineReducers({
    items,
    isFetching,
    cities,
  });
};

const rentals = initRentalsReducer();

export default rentals;
