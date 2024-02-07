import { BANQUET_LIST, BANQUET_ERROR,GLOBAL_BANQUET_LIST } from "./banquetConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onBanquetList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(BANQUET_ERROR));

    let apiUrl = `/banquet/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: BANQUET_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(BANQUET_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalBanquetList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(BANQUET_ERROR));

    let apiUrl = `/banquet/banquetList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_BANQUET_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(BANQUET_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


