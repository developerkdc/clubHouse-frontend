import { GALLERY_LIST, GALLERY_ERROR,GLOBAL_GALLERY_LIST } from "./galleryConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onGalleryList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(GALLERY_ERROR));

    let apiUrl = `/gallery/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GALLERY_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(GALLERY_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

export const GlobalGalleryList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(GALLERY_ERROR));

    let apiUrl = `/gallery/galleryList`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GLOBAL_GALLERY_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(GALLERY_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};


