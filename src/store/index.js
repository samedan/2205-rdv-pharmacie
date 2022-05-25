import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rentals from "./reducers/rentals";
import rental from "./reducers/rental";
import rdv from "./reducers/rdv";
import auth from "./reducers/auth";
import thunk from "redux-thunk";
import manage from "./reducers/manage";

const addPromiseToDispatch = (store) => {
  const { dispatch } = store;
  return function (action) {
    if (action.then && typeof action.then === "function") {
      return action.then((action) => {
        dispatch(action);
      });
    }
    dispatch(action);
  };
};

export function initStore() {
  // PURE Functions, TODO: Explain (:
  const reducers = combineReducers({
    rentals,
    rental,
    rdv,
    auth,
    manage,
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

  store.dispatch = addPromiseToDispatch(store);

  return store;
}
