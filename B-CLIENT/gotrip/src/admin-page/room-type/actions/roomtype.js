import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";
import httpClient from '../../../shared/ultils/Request/ApiRequest.js';
import { API } from "../constants/api";
import types from "../constants/types";
import { ROOM_TYPE_TEXT_CONFIG } from "../constants/resources";

export const getRoomTypes = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.ROOM_TYPE_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const { data } = await httpClient.get(API.SEARCH_ROOM_TYPE, { params });

        dispatch({
            type: types.ROOM_TYPE_FETCH_SUCCESS,
            payload: {
                total: data?.total,
                roomTypes: data?.roomTypes
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.ROOM_TYPE_FETCH_ERROR, payload: null });
    }
}

export const createNewRoomType = (roomType = {}) => async dispatch => {
    try {
        dispatch({ type: types.ROOM_TYPE_SAVING, payload: null });

        await httpClient.post(API.CREATE_ROOM_TYPE, roomType);

        alertNotify.success(ROOM_TYPE_TEXT_CONFIG.CREATE_ROOM_TYPE_SUCCESS_MSG);
        dispatch({ type: types.ROOM_TYPE_SAVE_SUCCESS, payload: null });

    } catch (errorMessage) {
        dispatch({ type: types.ROOM_TYPE_SAVE_FAILED, payload: null });
        alertNotify.error(errorMessage);
    }
}

export const updateRoomType = (roomType, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.ROOM_TYPE_SAVING, payload: null });

        await httpClient.put(API.UPDATE_ROOM_TYPE, roomType);

        alertNotify.success(ROOM_TYPE_TEXT_CONFIG.UPDATE_ROOM_TYPE_SUCCESS_MSG);
        dispatch({ type: types.ROOM_TYPE_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({ type: types.ROOM_TYPE_SAVE_FAILED, payload: null });
    }
}

export const deleteRoomType = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_ROOM_TYPE}/${id}`);

        dispatch({ type: types.ROOM_TYPE_DELETED_SUCCESS, payload: null });

        alertNotify.error(ROOM_TYPE_TEXT_CONFIG.DELETE_ROOM_TYPE_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (roomType) => async dispatch => {
    dispatch({
        type: types.ROOM_TYPE_MODAL_SHOW,
        payload: {
            roomType: roomType
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.ROOM_TYPE_MODAL_CLOSE,
        payload: null
    });
}