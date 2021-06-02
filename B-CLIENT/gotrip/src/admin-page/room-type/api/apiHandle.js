import alertNotify from '../../../shared/ultils/alertNotify';
import { cleanObject } from '../../shared/ultils/ultils';
import { API } from '../constants/api';
import { ROOM_TYPE_TEXT_CONFIG } from '../constants/resources';

const getRoomTypes = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_ROOM_TYPE);

        params = cleanObject(params);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

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

const createNewRoomType = async (roomType, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_ROOM_TYPE, {
            method: "POST",
            body: JSON.stringify(roomType),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw ROOM_TYPE_TEXT_CONFIG.CREATE_ROOM_TYPE_DUPLICATE_MSG;
        }

        alertNotify.success(ROOM_TYPE_TEXT_CONFIG.CREATE_ROOM_TYPE_SUCCESS_MSG);

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

const updateRoomType = async (roomType, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_ROOM_TYPE, {
            method: "PUT",
            body: JSON.stringify(roomType),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok) {
            throw ROOM_TYPE_TEXT_CONFIG.UPDATE_ROOM_TYPE_FAILED_MSG;
        }

        alertNotify.success(ROOM_TYPE_TEXT_CONFIG.UPDATE_ROOM_TYPE_SUCCESS_MSG);

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

const deleteRoomType = async (id, onSuccess) => {
    try {
        const res = await fetch(`${API.DELETE_ROOM_TYPE}${id}`, {
            method: "DELETE",
            header: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok) {
            throw ROOM_TYPE_TEXT_CONFIG.DELETE_ROOM_TYPE_FAILED_MSG;
        }

        alertNotify.error(ROOM_TYPE_TEXT_CONFIG.DELETE_ROOM_TYPE_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

export {
    getRoomTypes,
    createNewRoomType,
    updateRoomType,
    deleteRoomType
}