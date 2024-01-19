import {ASSET_AVATARS} from "../../../../utils/constants/paths";
import {getAssetPath} from "../../../../utils/appHelpers";

const contactsList = [
    {
        id: 1457690400,
        name: 'Stella Johnson',
        thumb: getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "44x44"),
        email: 'stella.johnson@example.com',
        phone: '+1-215-659-7529',
        designation: 'CEO',
        selected: false,
        starred: false,
        frequently: true,
    },
    {
        id: 1457690401,
        name: 'Garry Sobars',
        thumb: getAssetPath(`${ASSET_AVATARS}/avatar4.jpg`, "44x44"),
        email: 'garry.sobars@example.com',
        phone: '+1-215-745-7529',
        designation: 'CFO',
        selected: false,
        starred: false,
        frequently: true,
    },
    {
        id: 1457690402,
        name: 'Alex Dolgove',
        thumb: getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`, "44x44"),
        email: 'alex.dolgove@example.com',
        phone: '+1-215-748-7855',
        designation: 'Designer',
        selected: false,
        starred: false,
        frequently: true,
    },

    


];

export default contactsList;
