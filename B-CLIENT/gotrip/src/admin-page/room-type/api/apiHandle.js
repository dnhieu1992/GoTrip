import alertNotify from '../../../shared/ultils/alertNotify';
import { cleanObject } from '../../shared/ultils/ultils';
import { API } from '../constants/api';
import { ROOMTYPE_TEXT_CONFIG } from '../constants/resources';

const getRoomTypes = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_ROOMTYPE);

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
        const res = await fetch(API.CREATE_ROOMTYPE, {
            method: "POST",
            body: JSON.stringify(roomType),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw ROOMTYPE_TEXT_CONFIG.CREATE_ROOMTYPE_DUPLICATE_MSG;
        }

        alertNotify.success(ROOMTYPE_TEXT_CONFIG.CREATE_ROOMTYPE_SUCCESS_MSG);

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
        const res = await fetch(API.UPDATE_ROOMTYPE, {
            method: "PUT",
            body: JSON.stringify(roomType),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok) {
            throw ROOMTYPE_TEXT_CONFIG.UPDATE_ROOMTYPE_FAILED_MSG;
        }

        alertNotify.success(ROOMTYPE_TEXT_CONFIG.UPDATE_ROOMTYPE_SUCCESS_MSG);

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
        const res = await fetch(`${API.DELETE_ROOMTYPE}${id}`, {
            method: "DELETE",
            header: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok) {
            throw ROOMTYPE_TEXT_CONFIG.DELETE_ROOMTYPE_FAILED_MSG;
        }

        alertNotify.error(ROOMTYPE_TEXT_CONFIG.DELETE_ROOMTYPE_SUCCESS_MSG);

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