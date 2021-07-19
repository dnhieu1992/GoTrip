import types from '../constants/types';

const initialState = {
    total: 0,
    cities: [],
    countries: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
};

function cityReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.CITY_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.CITY_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                cities: payload.cities,
                dataReady: true,
                isFetch: false
            };
        case types.CITY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        case types.CITY_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true },
            };
        case types.CITY_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.CITY_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false },
            };
        case types.CITY_DELETED_SUCCESS:
            return {
                ...state,
                isFetch: true
            };
        case types.CITY_MODAL_SHOW:
            return {
                ...state,
                modal: { city: payload.city }
            };
        case types.CITY_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        case types.CITY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            }
        case types.GET_COUNTRY_SUCCESS:
            return {
                ...state,
                countries: payload.countries
            };
        case types.GET_COUNTRY_ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default cityReducer;