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
                dataReady: true,
                isFetch: false
            };
        case types.PROPERTY_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true },
            };
        case types.PROPERTY_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.PROPERTY_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false },
            };
        case types.PROPERTY_DELETED_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.PROPERTY_MODAL_SHOW:
            return {
                ...state,
                modal: { property: payload.property }
            };
        case types.PROPERTY_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        case types.PROPERTY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        case types.PROPERTY_FILE_CHANGE:
            debugger
            return {
                ...state,
                file: payload.file
            };
        default:
            return state;
    }
}

export default propertyReducer;