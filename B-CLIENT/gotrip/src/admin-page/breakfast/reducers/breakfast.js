import types from '../constants/types';

const initialState = {
    total: 0,
    breakfasts: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
};

function breakfastReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.BREAKFAST_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.BREAKFAST_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                breakfasts: payload.breakfasts,
                dataReady: true,
                isFetch: false
            };
        case types.BREAKFAST_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        case types.BREAKFAST_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true },
            };
        case types.BREAKFAST_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.BREAKFAST_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false },
            };
        case types.BREAKFAST_DELETED_SUCCESS:
            return {
                ...state,
                isFetch: true
            };
        case types.BREAKFAST_MODAL_SHOW:
            return {
                ...state,
                modal: { breakfast: payload.breakfast }
            };
        case types.BREAKFAST_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        case types.BREAKFAST_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            }
        default:
            return state;
    }
}

export default breakfastReducer;