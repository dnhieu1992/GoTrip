import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";
import { API } from "../constants/api";
import { ROOM_NAME_TEXT_CONFIG } from '../constants/resources';

const getRoomNames = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_ROOM_NAME);

        params = cleanObject(params);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        if (onSuccess) {
            return onSuccess(data);
        }
    } catch (error) {
        alertNotify.error(error);
        if (onError) {
            return onError();
        }
    }
}

const createRoomName = async (roomName, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_ROOM_NAME, {
            method: "POST",
            body: JSON.stringify(roomName),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw ROOM_NAME_TEXT_CONFIG.CREATE_ROOM_NAME_DUPLICATE_MSG;
        }

        alertNotify.success(ROOM_NAME_TEXT_CONFIG.CREATE_ROOM_NAME_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
        if (onError) {
            return onError();
        }
    }
}

const updateRoomName = async (roomName, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_ROOM_NAME, {
            method: "PUT",
            body: JSON.stringify(roomName),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw ROOM_NAME_TEXT_CONFIG.UPDATE_ROOM_NAME_FAILED_MSG;
        }

        alertNotify.success(ROOM_NAME_TEXT_CONFIG.UPDATE_ROOM_NAME_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
        if (onError) {
            return onError();
        }
    }
}

const deleteRoomName = async (id, onSuccess, onError) => {
    try {
        const res = await fetch(`${API.DELETE_ROOM_NAME}${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw ROOM_NAME_TEXT_CONFIG.DELETE_ROOM_NAME_FAILED_MSG;
        }

        alertNotify.error(ROOM_NAME_TEXT_CONFIG.DELETE_ROOM_NAME_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
        if (onError) {
            return onError();
        }
    }
}

const getRoomTypes = async () => {
    try {
        const url = new URL(API.GET_ROOM_TYPE);
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(res.status);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {
    getRoomNames,
    createRoomName,
    updateRoomName,
    deleteRoomName,
    getRoomTypes
}