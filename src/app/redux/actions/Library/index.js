import { LIBRARY_LIST, LIBRARY_ERROR,GLOBAL_LIBRARY_LIST } from "./libraryConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onLibraryList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(LIBRARY_ERROR));

    let apiUrl = `/library/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);


    dispatch({ type: LIBRARY_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(LIBRARY_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalLibraryList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(LIBRARY_ERROR));

    let apiUrl = `/library/libraryList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_LIBRARY_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(LIBRARY_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


