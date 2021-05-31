import { cleanObject } from '../../shared/ultils/ultils';
import { BED_TEXT_CONFIG } from '../constants/resources';
import alertNotify from '../../../shared/ultils/alertNotify.js';
import { API } from '../constants/api';

const getBeds = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_BED);

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

const createNewBed = async (bed, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_BED, {
            method: "POST",
            body: JSON.stringify(bed),
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw BED_TEXT_CONFIG.CREATE_BED_DUPLICATE_MSG;
        }

        alertNotify.success(BED_TEXT_CONFIG.CREATE_BED_SUCCESS_MSG);

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

const updateBed = async (bed, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_BED, {
            method: "PUT",
            body: JSON.stringify(bed),
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        if (!res.ok) {
            throw BED_TEXT_CONFIG.UPDATE_BED_FAILED_MSG;
        }

        alertNotify.success(BED_TEXT_CONFIG.UPDATE_BED_SUCCESS_MSG);

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

const deleteBed = async (id, onSuccess, onError) => {
    try {
        const res = await fetch(`http://localhost:5000/api/bed/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        if (!res.ok) {
            throw BED_TEXT_CONFIG.DELETE_BED_FAILED_MSG;
        }

        alertNotify.success(BED_TEXT_CONFIG.DELETE_BED_SUCCESS_MSG);

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
    getBeds,
    createNewBed,
    updateBed,
    deleteBed,
}