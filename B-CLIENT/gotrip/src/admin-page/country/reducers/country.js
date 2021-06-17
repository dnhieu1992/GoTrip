import {
    COUNTRY_FETCHING,
    COUNTRY_FETCH_SUCCESS,
    COUNTRY_FETCH_ERROR,
    COUNTRY_MODAL_SHOW,
    COUNTRY_MODAL_CLOSE,
    COUNTRY_SAVE_SUCCESS,
    COUNTRY_SAVING,
    COUNTRY_SAVE_FAILED,
    COUNTRY_DELETED_SUCCESS
} from '../constants/types';

const initialState = {
    total: 0,
    countries: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
};

function countryReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case COUNTRY_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case COUNTRY_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                countries: payload.countries,
                dataReady: true,
                isFetch: false
            };
        case COUNTRY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        case COUNTRY_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true },
            };
        case COUNTRY_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case COUNTRY_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false },
            };
        case COUNTRY_DELETED_SUCCESS:
            return {
                ...state,
                isFetch: true
            };
        case COUNTRY_MODAL_SHOW:
            return {
                ...state,
                modal: { country: payload.country }
            };
        case COUNTRY_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        default:
            return state;
    }
}

export default countryReducer;