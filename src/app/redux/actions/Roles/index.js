import { ROLE_LIST, ROLE_ERROR,GLOBAL_ROLE_LIST } from "./roleConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onRoleList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(ROLE_ERROR));

    let apiUrl = `/role/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: ROLE_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(ROLE_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalRoleList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(ROLE_ERROR));

    let apiUrl = `/role/rolesList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_ROLE_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(ROLE_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


