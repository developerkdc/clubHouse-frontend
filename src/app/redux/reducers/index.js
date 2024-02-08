import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import contactsApp from "./contactsApp";
import UserReducer from "./User";
import RoleReducer from "./Roles";
import NewsReducer from "./NewsAndCircular";
import MemberReducer from "./Member";
import EventReducer from "./Event";
import BanquetReducer from "./Banquet";
import SportReducer from "./Sport";
import GalleryReducer from "./Gallery";
import SalonReducer from "./Salon";
import SpaReducer from "./Spa";
import NutritionistReducer from "./Nutritionist";
import LibraryReducer from "./Library";
import TrainerReducer from "./Trainer";

const exportReducers = (history) => {
  return combineReducers({
    router: connectRouter(history),
    userReducer: UserReducer,
    roleReducer: RoleReducer,
    newsReducer: NewsReducer,
    memberReducer: MemberReducer,
    eventReducer: EventReducer,
    banquetReducer: BanquetReducer,
    sportReducer: SportReducer,
    galleryReducer: GalleryReducer,
    salonReducer: SalonReducer,
    spaReducer: SpaReducer,
    libraryReducer: LibraryReducer,
    nutritionistReducer: NutritionistReducer,
    trainerReducer: TrainerReducer,
    contactsApp: contactsApp,
  });
};

export default exportReducers;
