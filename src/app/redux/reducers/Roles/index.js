import {
    ROLE_ADDED,
    ROLE_DELETE,
    ROLE_EDIT,
    ROLE_LIST,
    ROLE_ERROR,
    GLOBAL_ROLE_LIST,
    ROLE_SUCCESS
  } from "../../actions/Roles/roleConstant";
  
  const initialState = {
    roleList: [],
    globalRoleList:[],
    loading: false,
    error: null,
    successMessage: null,
    totalPages:null
  };
  
  const reducerFunc = (state = initialState, action) => {
    switch (action.type) {
      case ROLE_LIST:
        return {
          ...state,
          roleList: action.payload?.data || [],
          loading: false,
          error: null,
          successMessage:action.payload?.message,
          totalPages:action.payload?.totalPages,
        };
      case GLOBAL_ROLE_LIST:
        return {
          ...state,
          globalRoleList: action.payload?.data || [],
          loading: false,
          error: null,
          successMessage:action.payload?.message,
        };
  
      case ROLE_ADDED:
      case ROLE_EDIT:
      case ROLE_DELETE:
        return {
          ...state,
          loading: false,
          successMessage: action.payload?.message,
          error: null
        };
  
      case ROLE_ERROR:
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