import alertNotify from "../../../shared/ultils/alertNotify";
import httpClient from "../../../shared/ultils/Request/ApiRequest";
import { cleanObject } from "../../shared/ultils/ultils";
import { API } from "../constants/api";
import { ROOM_NAME_TEXT_CONFIG } from "../constants/resources";
import types from "../constants/types";

export const getRoomNames = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.ROOM_NAME_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });
        debugger
        const { data } = await httpClient.get(API.SEARCH_ROOM_NAME, { params });

        const roomNames= data.roomNames.map( roomName=>{
            return{
                ...roomName,
                roomTypeName: roomName?.roomType?.name
            }
        })

        dispatch({
            type: types.ROOM_NAME_FETCH_SUCCESS,
            payload: {
                total: data?.total,
                roomNames: roomNames

            }
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.ROOM_NAME_FETCH_ERROR, payload: null });
    }
}

export const createNewRoomName = (roomName = {}) => async dispatch => {
    try {
        dispatch({
            type: types.ROOM_NAME_SAVING,
            payload: null
        });

        await httpClient.post(API.CREATE_ROOM_NAME, roomName);

        alertNotify.success(ROOM_NAME_TEXT_CONFIG.CREATE_ROOM_NAME_SUCCESS_MSG);

        dispatch({
            type: types.ROOM_NAME_SAVE_SUCCESS,
            payload: null
        });

    } catch (errorMessage) {
        dispatch({
            type: types.ROOM_NAME_SAVE_FAILED,
            payload: null
        });
        alertNotify.error(errorMessage);
    }
}

export const updateRoomName = (roomName, options = {}) => async dispatch => {
    try {
        dispatch({
            type: types.ROOM_NAME_SAVING,
            payload: null
        });

        await httpClient.put(API.UPDATE_ROOM_NAME, roomName);

        alertNotify.success(ROOM_NAME_TEXT_CONFIG.UPDATE_ROOM_NAME_SUCCESS_MSG);

        dispatch({
            type: types.ROOM_NAME_SAVE_SUCCESS,
            payload: null
        });

        if (options.onSuccess) {
            return options.onSuccess();
        }
    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({
            type: types.ROOM_NAME_SAVE_FAILED,
            payload: null
        });
    }
}

export const deleteRoomName = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_ROOM_NAME}/${id}`);

        dispatch({
            type: types.ROOM_NAME_DELETED_SUCCESS,
            payload: null
        });

        alertNotify.error(ROOM_NAME_TEXT_CONFIG.DELETE_ROOM_NAME_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (roomName) => async dispatch => {
    dispatch({
        type: types.ROOM_NAME_MODAL_SHOW,
        payload: {
            roomName: roomName
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.ROOM_NAME_MODAL_CLOSE,
        payload: null
    });
}

export const getRoomTypes = () => async dispatch => {
    try {
        const { data } = await httpClient.get(API.GET_ROOM_TYPE);
        dispatch({
            type: types.GET_ROOM_TYPE_SUCCESS,
            payload: {
                roomTypes: data
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: types.GET_ROOM_TYPE_ERROR,
            payload: null
        });
    }
}

