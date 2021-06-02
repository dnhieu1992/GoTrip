import { cleanObject } from '../../shared/ultils/ultils';
import { AMENITY_TEXT_CONFIG } from '../constants/resources';
import alertNotify from '../../../shared/ultils/alertNotify.js';
import { API } from '../constants/api';

const getAmenities = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_AMENITY);

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
const createNewAmenity = async (amenity, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_AMENITY, {
            method: "POST",
            body: JSON.stringify(amenity),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw AMENITY_TEXT_CONFIG.CREATE_AMENITY_DUPLICATE_MSG;
        }

        alertNotify.success(AMENITY_TEXT_CONFIG.CREATE_AMENITY_SUCCESS_MSG);

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

const updateAmenity = async (amenity, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_AMENITY, {
            method: "PUT",
            body: JSON.stringify(amenity),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw AMENITY_TEXT_CONFIG.UPDATE_AMENITY_FAILED_MSG;
        }

        alertNotify.success(AMENITY_TEXT_CONFIG.UPDATE_AMENITY_SUCCESS_MSG);

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

const deleteAmenity = async (id, onSuccess, onError) => {
    try {
        const res = await fetch(`${API.DELETE_AMENITY}${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw AMENITY_TEXT_CONFIG.DELETE_AMENITY_FAILED_MSG;
        }

        alertNotify.error(AMENITY_TEXT_CONFIG.DELETE_AMENITY_SUCCESS_MSG);

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

const getAmenityCategories = async () => {
    try {
        const url = new URL(API.GET_AMENITYCATEGORIES);
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
    getAmenities,
    createNewAmenity,
    updateAmenity,
    deleteAmenity,
    getAmenityCategories
}