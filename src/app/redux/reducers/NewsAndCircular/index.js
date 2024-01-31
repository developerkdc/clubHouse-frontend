import {
  NEWS_LIST,
  NEWS_ERROR,
} from "../../actions/NewsAndCircular/newsConstant";

const initialState = {
  newsList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages:0
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_LIST:
      return {
        ...state,
        newsList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage:action.payload?.message,
        totalPages:action.payload?.totalPages,
      };

    case NEWS_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducerFunc;