import { EVENT_LIST, EVENT_ERROR,GLOBAL_EVENT_LIST } from "./eventConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onEventList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(EVENT_ERROR));

    let apiUrl = `/event/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: EVENT_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(EVENT_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalEventList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(EVENT_ERROR));

    let apiUrl = `/event/eventList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_EVENT_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(EVENT_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


