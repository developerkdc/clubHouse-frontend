import {
    LIBRARY_ADDED,
    LIBRARY_DELETE,
    LIBRARY_EDIT,
    LIBRARY_LIST,
    LIBRARY_ERROR,
    GLOBAL_LIBRARY_LIST,
    LIBRARY_SUCCESS
  } from "../../actions/Library/libraryConstant";
  
  const initialState = {
    libraryList: [],
    globalLibraryList:[],
    loading: false,
    error: null,
    successMessage: null,
    totalPages:null
  };
  
  const reducerFunc = (state = initialState, action) => {
    switch (action.type) {
      case LIBRARY_LIST:
        return {
          ...state,
          libraryList: action.payload?.data || [],
          loading: false,
          error: null,
          successMessage:action.payload?.message,
          totalPages:action.payload?.totalPages,
        };
      case GLOBAL_LIBRARY_LIST:
        return {
          ...state,
          globalLibraryList: action.payload?.data || [],
          loading: false,
          error: null,
          successMessage:action.payload?.message,
        };
  
      case LIBRARY_ADDED:
      case LIBRARY_EDIT:
      case LIBRARY_DELETE:
        return {
          ...state,
          loading: false,
          successMessage: action.payload?.message,
          error: null
        };
  
      case LIBRARY_ERROR:
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