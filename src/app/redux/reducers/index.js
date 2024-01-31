import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contactsApp from "./contactsApp"
import UserReducer from "./User"
import RoleReducer from "./Roles"
import MemberReducer from "./Member"

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        userReducer: UserReducer,
        roleReducer: RoleReducer,
        memberReducer: MemberReducer,
        contactsApp: contactsApp
    });
};

export default exportReducers;

