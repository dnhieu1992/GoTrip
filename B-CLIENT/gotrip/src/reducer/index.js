import { combineReducers } from 'redux';
import country from '../admin-page/country/reducers/country';
import property from '../admin-page/property/reducers/property';

export default combineReducers({
    country,
    property
});