import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";
import { API } from "../constants/api";
import { PROPERTYTYPE_TEXT_CONFIG } from "../constants/resources";

const getPropertyTypes = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_PROPERTYTYPE);

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

const createPropertyType = async (propertyType, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_PROPERTYTYPE, {
            method: "POST",
            body: JSON.stringify(propertyType),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw PROPERTYTYPE_TEXT_CONFIG.CREATE_PROPERTYTYPE_DUPLICATE_MSG;
        }

        alertNotify.success(PROPERTYTYPE_TEXT_CONFIG.CREATE_PROPERTYTYPE_SUCCESS_MSG);

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

const updatePropertyType = async (propertyType, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_PROPERTYTYPE, {
            method: "PUT",
            body: JSON.stringify(propertyType),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw PROPERTYTYPE_TEXT_CONFIG.UPDATE_PROPERTYTYPE_FAILED_MSG;
        }

        alertNotify.success(PROPERTYTYPE_TEXT_CONFIG.UPDATE_PROPERTYTYPE_SUCCESS_MSG);

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

const deletePropertyType = async (id, onSuccess, onError) => {
    try {
        const res = await fetch(`${API.DELETE_PROPERTYTYPE}${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw PROPERTYTYPE_TEXT_CONFIG.DELETE_PROPERTYTYPE_FAILED_MSG;
        }

        alertNotify.error(PROPERTYTYPE_TEXT_CONFIG.DELETE_PROPERTYTYPE_SUCCESS_MSG);

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

const getProperties = async () => {
    try {
        const url = new URL(API.GET_PROPERTIES);
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
    getPropertyTypes,
    createPropertyType,
    updatePropertyType,
    deletePropertyType,
    getProperties
}