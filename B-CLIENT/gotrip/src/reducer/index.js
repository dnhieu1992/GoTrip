import { combineReducers } from 'redux';
import country from '../admin-page/country/reducers/country';
import property from '../admin-page/property/reducers/property';
import roomType from '../admin-page/room-type/reducers/roomType';
import amenityCategory from '../admin-page/amenity-category/reducers/amenityCategory';
import propertyType from '../admin-page/property-type/reducers/propertyType';
import roomName from '../admin-page/room-name/reducers/roomName';

export default combineReducers({
    country,
    property,
    roomType,
    amenityCategory,
    propertyType,
    roomName
});