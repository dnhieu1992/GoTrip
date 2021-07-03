import types from "../constants/types";

const initialState = {
    total: 0,
    amenityCategories: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
};

function amenityCategoryReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.AMENITY_CATEGORY_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.AMENITY_CATEGORY_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                amenityCategories: payload.amenityCategories,
                dataReady: true,
                isFetch: false
            };
        case types.AMENITY_CATEGORY_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true },
            };
        case types.AMENITY_CATEGORY_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.AMENITY_CATEGORY_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false },
            };
        case types.AMENITY_CATEGORY_DELETED_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.AMENITY_CATEGORY_MODAL_SHOW:
            return {
                ...state,
                modal: { amenityCategory: payload.amenityCategory }
            };
        case types.AMENITY_CATEGORY_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        case types.AMENITY_CATEGORY_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        default:
            return state;
    }
}

export default amenityCategoryReducer;