import types from '../constants/types';

const initialState = {
    total: 0,
    amenities: [],
    amenityCategories: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
};

function amenityReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.AMENITY_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.AMENITY_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                amenities: payload.amenities,
                dataReady: true,
                isFetch: false
            };
        case types.AMENITY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        case types.AMENITY_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true },
            };
        case types.AMENITY_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.AMENITY_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false },
            };
        case types.AMENITY_DELETED_SUCCESS:
            return {
                ...state,
                isFetch: true
            };
        case types.AMENITY_MODAL_SHOW:
            return {
                ...state,
                modal: { amenity: payload.amenity }
            };
        case types.AMENITY_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        case types.AMENITY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            }
        case types.GET_AMENITYCATEGORY_SUCCESS:
            return {
                ...state,
                amenityCategories: payload.amenityCategories
            };
        case types.GET_AMENITYCATEGORY_ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default amenityReducer;