import { NEWS_LIST, NEWS_ERROR } from "./newsConstant";
import { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });


export const onNewsList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(NEWS_ERROR));

    let apiUrl = `/news/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: NEWS_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(NEWS_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};