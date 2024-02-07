import {
  BANQUET_ADDED,
  BANQUET_DELETE,
  BANQUET_EDIT,
  BANQUET_LIST,
  BANQUET_ERROR,
  GLOBAL_BANQUET_LIST,
  BANQUET_SUCCESS,
} from "../../actions/Banquet/banquetConstant";

const initialState = {
  banquetList: [],
  globalBanquetList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: null,
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case BANQUET_LIST:
      return {
        ...state,
        banquetList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
        totalPages: action.payload?.totalPages,
      };
    case GLOBAL_BANQUET_LIST:
      return {
        ...state,
        globalBanquetList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
      };

    case BANQUET_ADDED:
    case BANQUET_EDIT:
    case BANQUET_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null,
      };

    case BANQUET_ERROR:
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
