import {
    MEMBER_ADDED,
    MEMBER_DELETE,
    MEMBER_EDIT,
    MEMBER_LIST,
    MEMBER_ERROR,
    GLOBAL_MEMBER_LIST,
    MEMBER_SUCCESS
  } from "../../actions/Member/memberConstant";
  
  const initialState = {
    memberList: [],
    globalMemberList:[],
    loading: false,
    error: null,
    successMessage: null,
    totalPages:null
  };
  
  const reducerFunc = (state = initialState, action) => {
    switch (action.type) {
      case MEMBER_LIST:
        return {
          ...state,
          memberList: action.payload?.data || [],
          loading: false,
          error: null,
          successMessage:action.payload?.message,
          totalPages:action.payload?.totalPages,
        };
      case GLOBAL_MEMBER_LIST:
        return {
          ...state,
          globalMemberList: action.payload?.data || [],
          loading: false,
          error: null,
          successMessage:action.payload?.message,
        };
  
      case MEMBER_ADDED:
      case MEMBER_EDIT:
      case MEMBER_DELETE:
        return {
          ...state,
          loading: false,
          successMessage: action.payload?.message,
          error: null
        };
  
      case MEMBER_ERROR:
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