import { SPORT_LIST, SPORT_ERROR,GLOBAL_SPORT_LIST } from "./sportConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onSportList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(SPORT_ERROR));

    let apiUrl = `/sport/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: SPORT_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(SPORT_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalSportList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(SPORT_ERROR));

    let apiUrl = `/sport/sportList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_SPORT_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(SPORT_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


