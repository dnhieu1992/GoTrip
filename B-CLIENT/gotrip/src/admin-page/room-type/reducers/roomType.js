import types from "../constants/types";

const initialState = {
    total: 0,
    roomTypes: [],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
};

function roomTypeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.ROOM_TYPE_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.ROOM_TYPE_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                roomTypes: payload.roomTypes,
                dataReady: true,
                isFetch:false
            };
            case types.ROOM_TYPE_SAVING:
                return {
                    ...state,
                    modal: { ...state.modal, isLoading: true },
                };
            case types.ROOM_TYPE_SAVE_SUCCESS:
                return {
                    ...state,
                    modal: null,
                    isFetch: true
                };
            case types.ROOM_TYPE_SAVE_FAILED:
                return {
                    ...state,
                    modal: { ...state.modal, isLoading: false },
                };
            case types.ROOM_TYPE_DELETED_SUCCESS:
                return {
                    ...state,
                    modal:null,
                    isFetch: true
                };
            case types.ROOM_TYPE_MODAL_SHOW:
                return {
                    ...state,
                    modal: { roomType: payload.roomType }
                };
            case types.ROOM_TYPE_MODAL_CLOSE:
                return {
                    ...state,
                    modal: null
                };
        case types.ROOM_TYPE_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            };
        default:
            return state;
    }
}

export default roomTypeReducer;