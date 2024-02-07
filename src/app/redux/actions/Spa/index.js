import { SPA_LIST, SPA_ERROR,GLOBAL_SPA_LIST } from "./spaConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onSpatList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(SPA_ERROR));

    let apiUrl = `/spa/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: SPA_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(SPA_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalSpaList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(SPA_ERROR));

    let apiUrl = `/spa/spaList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_SPA_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(SPA_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


