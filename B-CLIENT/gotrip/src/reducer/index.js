import { combineReducers } from 'redux';
import city from '../admin-page/city/reducers/city';
import amenity from '../admin-page/amenity/reducers/amenity';
import bed from '../admin-page/bed/reducers/bed';
import breakfast from '../admin-page/breakfast/reducers/breakfast';
import country from '../admin-page/country/reducers/country';
import property from '../admin-page/property/reducers/property';
import roomType from '../admin-page/room-type/reducers/roomType';
import amenityCategory from '../admin-page/amenity-category/reducers/amenityCategory';
import propertyType from '../admin-page/property-type/reducers/propertyType';
import roomName from '../admin-page/room-name/reducers/roomName';
import propertyManagement from '../property-management/reducers/propertyManagement';

export default combineReducers({
    city,
    bed,
    breakfast,
    amenity,
    country,
    property,
    roomType,
    amenityCategory,
    propertyType,
    roomName,
    propertyManagement
});