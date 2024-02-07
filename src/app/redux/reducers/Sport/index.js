import {
  SPORT_ADDED,
  SPORT_DELETE,
  SPORT_EDIT,
  SPORT_LIST,
  SPORT_ERROR,
  GLOBAL_SPORT_LIST,
  SPORT_SUCCESS,
} from "../../actions/Sport/sportConstant";

const initialState = {
  sportList: [],
  globalSportList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: null,
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case SPORT_LIST:
      return {
        ...state,
        sportList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
        totalPages: action.payload?.totalPages,
      };
    case GLOBAL_SPORT_LIST:
      return {
        ...state,
        globalSportList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
      };

    case SPORT_ADDED:
    case SPORT_EDIT:
    case SPORT_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null,
      };

    case SPORT_ERROR:
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
