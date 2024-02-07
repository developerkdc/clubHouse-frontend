import {
  GALLERY_ADDED,
  GALLERY_DELETE,
  GALLERY_EDIT,
  GALLERY_LIST,
  GALLERY_ERROR,
  GLOBAL_GALLERY_LIST,
  GALLERY_SUCCESS,
} from "../../actions/Gallery/galleryConstant";

const initialState = {
  galleryList: [],
  globalGalleryList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: null,
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case GALLERY_LIST:
      return {
        ...state,
        galleryList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
        totalPages: action.payload?.totalPages,
      };
    case GLOBAL_GALLERY_LIST:
      return {
        ...state,
        globalGALLERYList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
      };

    case GALLERY_ADDED:
    case GALLERY_EDIT:
    case GALLERY_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null,
      };

    case GALLERY_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducerFunc;
