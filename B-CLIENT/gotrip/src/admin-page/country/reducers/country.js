import { FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRIES } from '../constants/types';

const initialState = {
    total: 0,
    countries: [],
    searchParam: {},
    options: {},
    dataReady: false
};

function countryReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_COUNTRIES:
            return {
                ...state,
                dataReady: false
            };
        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                ...payload,
                dataReady: true
            };
        default:
            return state;
    }
}

export default countryReducer;