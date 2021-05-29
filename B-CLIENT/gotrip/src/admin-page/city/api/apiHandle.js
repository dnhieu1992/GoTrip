import { cleanObject } from '../../shared/ultils/ultils';
import { CITY_TEXT_CONFIG } from '../constants/resources';
import alertNotify from '../../../shared/ultils/alertNotify.js';
import { API } from '../constants/api';

const getCities = async (params, onSuccess, onError) => {
    try {
        const url = new URL(API.SEARCH_CITY);

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
const createNewCity = async (city, onSuccess, onError) => {
    try {
        const res = await fetch(API.CREATE_CITY, {
            method: "POST",
            body: JSON.stringify(city),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw CITY_TEXT_CONFIG.CREATE_CITY_DUPLICATE_MSG;
        }

        alertNotify.success(CITY_TEXT_CONFIG.CREATE_CITY_SUCCESS_MSG);

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

const updateCity = async (city, onSuccess, onError) => {
    try {
        const res = await fetch(API.UPDATE_CITY, {
            method: "PUT",
            body: JSON.stringify(city),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw CITY_TEXT_CONFIG.UPDATE_CITY_FAILED_MSG;
        }

        alertNotify.success(CITY_TEXT_CONFIG.UPDATE_CITY_SUCCESS_MSG);

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

const deleteCity = async (id, onSuccess, onError) => {
    try {
        const res = await fetch(`${API.DELETE_CITY}${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok) {
            throw CITY_TEXT_CONFIG.DELETE_CITY_FAILED_MSG;
        }

        alertNotify.error(CITY_TEXT_CONFIG.DELETE_CITY_SUCCESS_MSG);

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

const getCountries = async () => {
    try {
        const url = new URL(API.GET_COUNTRIES);
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
    getCities,
    createNewCity,
    updateCity,
    deleteCity,
    getCountries
}