import { combineReducers } from "redux";
import { isFetchingReducer } from "./common";

const initRdvReducer = () => {
  const items = (state = [], action) => {
    switch (action.type) {
      case "FETCH_RDV":
        return action.rdv;
      case "CREATE_RDV":
        return [...state, action.rdv];
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

  const isFetching = isFetchingReducer("rdv");

  return combineReducers({
    items,
    isFetching,
    cities,
  });
};

const rdv = initRdvReducer();

export default rdv;
