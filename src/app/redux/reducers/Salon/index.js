import {
  SALON_ADDED,
  SALON_DELETE,
  SALON_EDIT,
  SALON_LIST,
  SALON_ERROR,
  GLOBAL_SALON_LIST,
  SALON_SUCCESS,
} from "../../actions/Salon/salonConstant";

const initialState = {
  salonList: [],
  globalsalonList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: null,
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case SALON_LIST:
      return {
        ...state,
        salonList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
        totalPages: action.payload?.totalPages,
      };
    case GLOBAL_SALON_LIST:
      return {
        ...state,
        globalsalonList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
      };

    case SALON_ADDED:
    case SALON_EDIT:
    case SALON_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null,
      };

    case SALON_ERROR:
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
