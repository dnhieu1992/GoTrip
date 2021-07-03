import types from "../constants/types";

const initialState = {
    total: 0,
    roomNames: [],
    roomTypes:[],
    searchParams: {},
    options: {
        pageNumber: 1,
        pageSize: 50
    },
    dataReady: false,
    modal: null
}

function roomNameReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.ROOM_NAME_FETCHING:
            return {
                ...state,
                dataReady: false
            };
        case types.ROOM_NAME_FETCH_SUCCESS:
            return {
                ...state,
                total: payload.total,
                roomNames: payload.roomNames,
                dataReady: true,
                isFetch: false
            };
        case types.ROOM_NAME_SAVING:
            return {
                ...state,
                modal: { ...state.modal, isLoading: true }
            };
        case types.ROOM_NAME_SAVE_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.ROOM_NAME_SAVE_FAILED:
            return {
                ...state,
                modal: { ...state.modal, isLoading: false }
            };
        case types.ROOM_NAME_DELETED_SUCCESS:
            return {
                ...state,
                modal: null,
                isFetch: true
            };
        case types.ROOM_NAME_MODAL_SHOW:
            return {
                ...state,
                modal: { roomName: payload.roomName }
            };
        case types.ROOM_NAME_MODAL_CLOSE:
            return {
                ...state,
                modal: null
            };
        case types.ROOM_NAME_FETCH_ERROR:
            return {
                ...state,
                dataReady: true
            }
        case types.GET_ROOM_TYPE_SUCCESS:
            return {
                ...state,
                roomTypes: payload.roomTypes,
                //roomTypeName:roomTypes.name
            };
        case types.GET_ROOM_TYPE_ERROR:
            return {
                ...state

            };
        default: return state;
    }
}
export default roomNameReducer;