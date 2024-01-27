// userActions.js

// import { Axios } from "index";
import { USER_ADDED, USER_DELETE, USER_EDIT, USER_LIST, USER_ERROR, USER_SUCCESS } from "./userConstant";
import axios from "axios";
import jwtAuthAxios, { Axios } from "app/services/config";

const setLoading = (type) => ({ type, payload: true });
const clearLoading = (type) => ({ type, payload: false });
const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });
const setSuccess = (type, successMessage) => ({ type, payload: successMessage });
const clearSuccess = (type) => ({ type, payload: null });

// Dummy API function using Axios for illustration purposes
const dummyApi = async (url, data, method = "GET") => {
  try {
    const response = await axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    // Axios automatically throws an error for non-2xx responses
    return response.data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const onUserList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(USER_ERROR));

    let apiUrl = `/user/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: USER_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(USER_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const onUserAdd = (postData) => async (dispatch) => {
  try {
    // dispatch(setLoading(USER_ADDED));
    dispatch(clearError(USER_ERROR));

    // Implement logic for adding a new user if needed

    const { data } = await Axios.post('/user/add', postData);
    // dispatch({ type: USER_ADDED });
    dispatch(setSuccess(USER_ADDED, data.message));
  } catch (error) {
    dispatch(setError(USER_ERROR, error.message));
  } finally {
    // dispatch(clearLoading(USER_ADDED));
  }
};

// export const onUserEdit = (contact) => async (dispatch) => {
//   try {
//     dispatch(setLoading(USER_EDIT));
//     dispatch(clearError(USER_ERROR));

//     // Implement logic for editing a user if needed
//     dispatch({ type: USER_EDIT, payload: contact });
//     dispatch(setSuccess(USER_SUCCESS, "User edited successfully"));
//   } catch (error) {
//     dispatch(setError(USER_ERROR, "Error editing user"));
//   } finally {
//     dispatch(clearLoading(USER_EDIT));
//   }
// };

// export const onUserDelete = () => async (dispatch) => {
//   try {
//     dispatch(setLoading(USER_DELETE));
//     dispatch(clearError(USER_ERROR));

//     // Implement logic for deleting a user if needed
//     dispatch({ type: USER_DELETE });
//     dispatch(setSuccess(USER_SUCCESS, "User deleted successfully"));
//   } catch (error) {
//     dispatch(setError(USER_ERROR, "Error deleting user"));
//   } finally {
//     dispatch(clearLoading(USER_DELETE));
//   }
// };
