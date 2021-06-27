import types from '../constants/types';

const initialState = {
    total: 0,
    properties: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
};

function propertyReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.PROPERTY_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.PROPERTY_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                properties: payload.properties,
                dataReady: true
            };
        case types.PROPERTY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        default:
            return state;
    }
}

export default propertyReducer;