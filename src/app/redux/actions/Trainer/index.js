import {
  TRAINER_LIST,
  TRAINER_ERROR,
  GLOBAL_TRAINER_LIST,
} from "./trainerConstant";
import { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onTrainertList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(TRAINER_ERROR));

    let apiUrl = `/health_fitness/trainer/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl =
        apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);
    console.log(data,'data');

    dispatch({ type: TRAINER_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(TRAINER_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalTrainerList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(TRAINER_ERROR));

    let apiUrl = `/health_fitness/trainer/trainerList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl =
        apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_TRAINER_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(TRAINER_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};
