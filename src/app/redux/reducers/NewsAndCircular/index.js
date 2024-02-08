import {
  NEWS_ADDED,
  NEWS_DELETE,
  NEWS_EDIT,
  NEWS_LIST,
  NEWS_ERROR,
  GLOBAL_NEWS_LIST,
  NEWS_SUCCESS,
} from "../../actions/NewsAndCircular/newsConstant";

const initialState = {
  newsList: [],
  globalNewsList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: null,
};


const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_LIST:
      return {
        ...state,
        newsList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
        totalPages: action.payload?.totalPages,
      };
    case GLOBAL_NEWS_LIST:
      return {
        ...state,
        globalNewsList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
      };

    case NEWS_ADDED:
    case NEWS_EDIT:
    case NEWS_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null,
      };

    case NEWS_ERROR:
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
