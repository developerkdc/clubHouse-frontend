import { SALON_LIST, SALON_ERROR,GLOBAL_SALON_LIST } from "./salonConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onSalontList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(SALON_ERROR));

    let apiUrl = `/salon/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: SALON_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(SALON_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalSalonList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(SALON_ERROR));

    let apiUrl = `/salon/salonList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_SALON_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(SALON_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


