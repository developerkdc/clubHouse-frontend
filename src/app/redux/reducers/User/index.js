// import { USER_ADDED, USER_DELETE, USER_EDIT, USER_LIST } from "../../actions/User/userConstant";

// const INIT_STATE = {
//   refreshUserList: false,
//   // visibleDialog: VISIBLE_DIALOG_OPTIONS.NONE,
//   currentContact: null,
//   refreshLabelList: false,
// };

// const reducerFunc = (state = INIT_STATE, action) => {
//   switch (action.type) {
//     case USER_ADDED: {
//       return {
//         ...state,
//         refreshContactList: true,
//       };
//     }
//     case USER_EDIT: {
//       return {
//         ...state,
//         refreshContactList: true,
//       };
//     }
//     case USER_LIST: {
//       return {
//         ...state,
//         refreshContactList: true,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };

// export default reducerFunc;

// userReducer.js

import {
  USER_ADDED,
  USER_DELETE,
  USER_EDIT,
  USER_LIST,
  USER_ERROR,
  USER_SUCCESS
} from "../../actions/User/userConstant";

const initialState = {
  userList: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages:null
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        userList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage:action.payload?.message,
        totalPages:action.payload?.totalPages,
      };

    case USER_ADDED:
    case USER_EDIT:
    case USER_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null
      };

    case USER_ERROR:
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

