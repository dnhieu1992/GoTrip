import { cleanObject } from '../../shared/ultils/ultils';
import { COUNTRY_TEXT_CONFIG } from '../constants/resources';
import alertNotify from '../../../shared/ultils/alertNotify';
import { API } from '../constants/api';

const getCountries = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_COUNTRY);

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

const createNewCountry = async (country, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_COUNTRY, {
            method: "POST",
            body: JSON.stringify(country),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw COUNTRY_TEXT_CONFIG.CREATE_COUNTRY_DUPLICATE_MSG;
        }

        alertNotify.success(COUNTRY_TEXT_CONFIG.CREATE_COUNTRY_SUCCESS_MSG);

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

const updateCountry = async (country, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_COUNTRY, {
            method: "PUT",
            body: JSON.stringify(country),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw COUNTRY_TEXT_CONFIG.UPDATE_COUNTRY_FAILED_MSG;
        }

        alertNotify.success(COUNTRY_TEXT_CONFIG.UPDATE_COUNTRY_SUCCESS_MSG);

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
const deleteCountry = async (id, onSuccess, onError) => {
    try {
        const res = await fetch(`${API.DELETE_COUNTRY}${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw COUNTRY_TEXT_CONFIG.DELETE_COUNTRY_FAILED_MSG;
        }

        alertNotify.error(COUNTRY_TEXT_CONFIG.DELETE_COUNTRY_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error)
    }
}

export {
    getCountries,
    createNewCountry,
    updateCountry,
    deleteCountry
}