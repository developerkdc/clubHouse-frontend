import {
  NUTRITIONIST_ADDED,
  NUTRITIONIST_DELETE,
  NUTRITIONIST_EDIT,
  NUTRITIONIST_LIST,
  NUTRITIONIST_ERROR,
  GLOBAL_NUTRITIONIST_LIST,
  NUTRITIONIST_SUCCESS
} from "../../actions/Nutritionist/nutritionistConstant";

const initialState = {
  nutritionistList: [],
  globalNutritionistList:[],
  loading: false,
  error: null,
  successMessage: null,
  totalPages:null
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case NUTRITIONIST_LIST:
      return {
        ...state,
        nutritionistList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage:action.payload?.message,
        totalPages:action.payload?.totalPages,
      };
    case GLOBAL_NUTRITIONIST_LIST:
      return {
        ...state,
        globalNutritionistList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage:action.payload?.message,
      };

    case NUTRITIONIST_ADDED:
    case NUTRITIONIST_EDIT:
    case NUTRITIONIST_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null
      };

    case NUTRITIONIST_ERROR:
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