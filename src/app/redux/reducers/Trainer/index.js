import {
  TRAINER_ADDED,
  TRAINER_DELETE,
  TRAINER_EDIT,
  TRAINER_LIST,
  TRAINER_ERROR,
  GLOBAL_TRAINER_LIST,
  TRAINER_SUCCESS
} from "../../actions/Trainer/trainerConstant";

const initialState = {
  trainerList: [],
  globalTrainerList:[],
  loading: false,
  error: null,
  successMessage: null,
  totalPages:null
};

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case TRAINER_LIST:
      return {
        ...state,
        trainerList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage:action.payload?.message,
        totalPages:action.payload?.totalPages,
      };
    case GLOBAL_TRAINER_LIST:
      return {
        ...state,
        globalTrainerList: action.payload?.data || [],
        loading: false,
        error: null,
        successMessage:action.payload?.message,
      };

    case TRAINER_ADDED:
    case TRAINER_EDIT:
    case TRAINER_DELETE:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        error: null
      };

    case TRAINER_ERROR:
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