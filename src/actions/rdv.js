import axiosService from "services/AxiosService";
import { deleteResource, extractApiErrors } from "./index";
const { bwmAxios } = axiosService;

export const createRdv = (rdv) => {
  return bwmAxios
    .post("/rdv", rdv)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
};

export const getRdv = (rdvId) => {
  return bwmAxios.get(`/rdv?rdv=${rdvId}`).then((res) => res.data);
};

export const fetchUserRdv = () => (dispatch) => {
  dispatch({ type: "REQUEST_DATA", resource: "manage-rdv" });
  return bwmAxios
    .get("/rdv/me")
    .then((res) => res.data)
    .then((rdv) => {
      dispatch({
        type: "REQUEST_DATA_COMPLETE",
        data: rdv,
        resource: "manage-rdv",
      });
    });
};

export const fetchReceivedRdv = () => (dispatch) => {
  dispatch({ type: "REQUEST_DATA", resource: "received-rdv" });
  return bwmAxios
    .get("/rdv/received")
    .then((res) => res.data)
    .then((rdv) => {
      dispatch({
        type: "REQUEST_DATA_COMPLETE",
        data: rdv,
        resource: "received-rdv",
      });
    });
};

// DELETE
export const deleteRdv = (rdvId) => (dispatch) => {
  return dispatch(
    deleteResource({
      url: `/rdv/${rdvId}`,
      resource: "manage-rdv",
    })
  );
};
