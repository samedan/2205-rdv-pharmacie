import axiosService from "services/AxiosService";

const { bwmAxios } = axiosService;

export const extractApiErrors = (resError) => {
  let errors = [{ title: "Error!", detail: "Ooops, something went wrong!" }];

  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }

  return errors;
};

// DELETE
export const deleteResource =
  ({ url, resource }) =>
  (dispatch) => {
    return bwmAxios
      .delete(url)
      .then((res) => res.data)
      .then(({ id }) => {
        dispatch({
          type: "DELETE_RESOURCE",
          id,
          resource: resource,
        });
      })
      .catch((error) => {
        dispatch({
          type: "REQUEST_ERROR",
          errors: extractApiErrors(error.response || []),
          resource: resource,
        });
      });
  };

export * from "./auth";
export * from "./rentals";
export * from "./bookings";
export * from "./rdv";
