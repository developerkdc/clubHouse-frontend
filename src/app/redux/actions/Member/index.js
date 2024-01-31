import { MEMBER_LIST, MEMBER_ERROR,GLOBAL_MEMBER_LIST } from "./memberConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onMemberList = (query) => async (dispatch) => {
  console.log(query,'queryquery');
  try {
    dispatch(clearError(MEMBER_ERROR));

    let apiUrl = `/member/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);
    console.log(data,'data');
    dispatch({ type: MEMBER_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(MEMBER_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalMemberList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(MEMBER_ERROR));

    let apiUrl = `/member/memberList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_MEMBER_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(MEMBER_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


