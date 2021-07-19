import types from "../constants/types";


const initialState = {
    total: 0,
    propertyTypes: [],
    properties: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
}

function propertyTypeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.PROPERTY_TYPE_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.PROPERTY_TYPE_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                propertyTypes: payload.propertyTypes,
                dataReady: true,
                isFetch: false
            };
        case types.PROPERTY_TYPE_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true }
            };
        case types.PROPERTY_TYPE_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.PROPERTY_TYPE_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false }
            };
        case types.PROPERTY_TYPE_DELETED_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.PROPERTY_TYPE_MODAL_SHOW:
            return {
                ...state,
                modal: { propertyType: payload.propertyType }
            };
        case types.PROPERTY_TYPE_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        case types.PROPERTY_TYPE_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            }
        case types.GET_PROPERTY_SUCCESS:
            return {
                ...state,
                properties: payload.properties
            };
        case types.GET_PROPERTY_ERROR:
            return {
                ...state

            };
        default: return state;
    }
}
export default propertyTypeReducer;