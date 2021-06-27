import types from '../constants/types';

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
        case types.COUNTRY_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.COUNTRY_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                countries: payload.countries,
                dataReady: true,
                isFetch: false
            };
        case types.COUNTRY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        case types.COUNTRY_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true },
            };
        case types.COUNTRY_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.COUNTRY_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false },
            };
        case types.COUNTRY_DELETED_SUCCESS:
            return {
                ...state,
                isFetch: true
            };
        case types.COUNTRY_MODAL_SHOW:
            return {
                ...state,
                modal: { country: payload.country }
            };
        case types.COUNTRY_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        default:
            return state;
    }
}

export default countryReducer;