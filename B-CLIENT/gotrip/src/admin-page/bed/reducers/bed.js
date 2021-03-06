import types from '../constants/types';

const initialState = {
    total: 0,
    beds: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
};

function bedReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.BED_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.BED_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                beds: payload.beds,
                dataReady: true,
                isFetch: false
            };
        case types.BED_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        case types.BED_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true },
            };
        case types.BED_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.BED_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false },
            };
        case types.BED_DELETED_SUCCESS:
            return {
                ...state,
                isFetch: true
            };
        case types.BED_MODAL_SHOW:
            return {
                ...state,
                modal: { bed: payload.bed }
            };
        case types.BED_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        case types.BED_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            }
        default:
            return state;
    }
}

export default bedReducer;