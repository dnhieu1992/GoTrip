import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";
import { API } from "../constants/api";
import { AMENITY_CATEGORY_TEXT_CONFIG } from "../constants/resources";

const getAmenityCategories = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_AMENITY_CATEGORY);

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

const createNewAmenityCategory = async (amenityCategory, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_AMENITY_CATEGORY, {
            method: "POST",
            body: JSON.stringify(amenityCategory),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw AMENITY_CATEGORY_TEXT_CONFIG.CREATE_AMENITY_CATEGORY_DUPLICATE_MSG;
        }

        alertNotify.success(AMENITY_CATEGORY_TEXT_CONFIG.CREATE_AMENITY_CATEGORY_SUCCESS_MSG);

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

const updateAmenityCategory = async (amenityCategory, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_AMENITY_CATEGORY, {
            method: "PUT",
            body: JSON.stringify(amenityCategory),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok) {
            throw AMENITY_CATEGORY_TEXT_CONFIG.UPDATE_AMENITY_CATEGORY_FAILED_MSG;
        }

        alertNotify.success(AMENITY_CATEGORY_TEXT_CONFIG.UPDATE_AMENITY_CATEGORY_SUCCESS_MSG);

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

const deleteAmenityCategory = async (id, onSuccess) => {
    try {
        const res = await fetch(`${API.DELETE_AMENITY_CATEGORY}${id}`, {
            method: "DELETE",
            header: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok) {
            throw AMENITY_CATEGORY_TEXT_CONFIG.DELETE_AMENITY_CATEGORY_FAILED_MSG;
        }

        alertNotify.error(AMENITY_CATEGORY_TEXT_CONFIG.DELETE_AMENITY_CATEGORY_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

export {
    getAmenityCategories,
    createNewAmenityCategory,
    updateAmenityCategory,
    deleteAmenityCategory
}