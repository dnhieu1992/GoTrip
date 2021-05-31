import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";
import { API } from "../constants/api";
import { PROPERTY_TEXT_CONFIG } from "../constants/resources";

const getProperties = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_PROPERTY);

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

const createNewProperty = async (property, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_PROPERTY, {
            method: "POST",
            body: JSON.stringify(property),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw PROPERTY_TEXT_CONFIG.CREATE_PROPERTY_DUPLICATE_MSG;
        }

        alertNotify.success(PROPERTY_TEXT_CONFIG.CREATE_PROPERTY_SUCCESS_MSG);

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

const updateProperty = async (property, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_PROPERTY, {
            method: "PUT",
            body: JSON.stringify(property),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw PROPERTY_TEXT_CONFIG.UPDATE_PROPERTY_FAILED_MSG;
        }

        alertNotify.success(PROPERTY_TEXT_CONFIG.UPDATE_PROPERTY_SUCCESS_MSG);

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

const deleteProperty = async (id, onSuccess, onError) => {
    try {
        const res =await fetch(`${API.DELETE_PROPERTY}${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw PROPERTY_TEXT_CONFIG.DELETE_PROPERTY_FAILED_MSG;
        }

        alertNotify.error(PROPERTY_TEXT_CONFIG.DELETE_PROPERTY_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

export {
    getProperties,
    createNewProperty,
    updateProperty,
    deleteProperty
}