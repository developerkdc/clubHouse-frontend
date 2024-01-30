import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contactsApp from "./contactsApp"
import UserReducer from "./User"
import RoleReducer from "./Roles"

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        userReducer: UserReducer,
        roleReducer: RoleReducer,
        contactsApp: contactsApp
    });
};

export default exportReducers;

