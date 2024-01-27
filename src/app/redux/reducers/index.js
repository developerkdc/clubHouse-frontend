import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contactsApp from "./contactsApp"
import UserReducer from "./User"

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        userReducer: UserReducer,
        contactsApp: contactsApp
    });
};

export default exportReducers;

