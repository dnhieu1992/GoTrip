import { cleanObject } from '../../shared/ultils/ultils';
import { BREAKFAST_TEXT_CONFIG } from '../constants/resources';
import alertNotify from '../../../shared/ultils/alertNotify.js';
import { API } from '../constants/api';

const getBreakfasts = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_BREAKFAST);

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

const createNewBreakfast = async (breakfast, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_BREAKFAST, {
            method: "POST",
            body: JSON.stringify(breakfast),
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw BREAKFAST_TEXT_CONFIG.CREATE_BREAKFAST_DUPLICATE_MSG;
        }

        alertNotify.success(BREAKFAST_TEXT_CONFIG.CREATE_BREAKFAST_SUCCESS_MSG);

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

const updateBreakfast= async (breakfast, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_BREAKFAST, {
            method: "PUT",
            body: JSON.stringify(breakfast),
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        if (!res.ok) {
            throw BREAKFAST_TEXT_CONFIG.UPDATE_BREAKFAST_FAILED_MSG;
        }

        alertNotify.success(BREAKFAST_TEXT_CONFIG.UPDATE_BREAKFAST_SUCCESS_MSG);

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

const deleteBreakfast = async (id, onSuccess, onError) => {
    try {
        const res = await fetch(`${API.DELETE_BREAKFAST}${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        if (!res.ok) {
            throw BREAKFAST_TEXT_CONFIG.DELETE_BREAKFAST_FAILED_MSG;
        }

        alertNotify.success(BREAKFAST_TEXT_CONFIG.DELETE_BREAKFAST_SUCCESS_MSG);

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

export {
    getBreakfasts,
    createNewBreakfast,
    updateBreakfast,
    deleteBreakfast,
}