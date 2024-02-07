import {
  SPA_ADDED,
  SPA_DELETE,
  SPA_EDIT,
  SPA_LIST,
  SPA_ERROR,
  GLOBAL_SPA_LIST,
  SPA_SUCCESS,
} from "../../actions/Spa/spaConstant.js";

const initialState = {
  spaList: [],
  globalSpaList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: null,
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case SPA_LIST:
      return {
        ...state,
        spaList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
        totalPages: action.payload?.totalPages,
      };
    case GLOBAL_SPA_LIST:
      return {
        ...state,
        globalSpaList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
      };

    case SPA_ADDED:
    case SPA_EDIT:
    case SPA_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null,
      };

    case SPA_ERROR:
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
