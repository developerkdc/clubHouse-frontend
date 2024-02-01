import {
  EVENT_ADDED,
  EVENT_DELETE,
  EVENT_EDIT,
  EVENT_LIST,
  EVENT_ERROR,
  GLOBAL_EVENT_LIST,
  EVENT_SUCCESS,
} from "../../actions/Event/eventConstant";

const initialState = {
  eventList: [],
  globalEventList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: null,
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_LIST:
      return {
        ...state,
        eventList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
        totalPages: action.payload?.totalPages,
      };
    case GLOBAL_EVENT_LIST:
      return {
        ...state,
        globalEventList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage: action.payload?.message,
      };

    case EVENT_ADDED:
    case EVENT_EDIT:
    case EVENT_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null,
      };

    case EVENT_ERROR:
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
