import { NUTRITIONIST_LIST, NUTRITIONIST_ERROR,GLOBAL_NUTRITIONIST_LIST } from "./nutritionistConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onNutritionisttList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(NUTRITIONIST_ERROR));

    let apiUrl = `/health_fitness/nutritionist/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: NUTRITIONIST_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(NUTRITIONIST_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalNutritionistList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(NUTRITIONIST_ERROR));

    let apiUrl = `/health_fitness/nutritionist/nutritionistList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_NUTRITIONIST_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(NUTRITIONIST_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


