import { cleanObject } from '../../shared/ultils/ultils';
import { COUNTRY_TEXT_CONFIG } from '../constants/resources';
import alertNotify from '../../../shared/ultils/alertNotify';
import { API } from '../constants/api';
import httpClient from '../../../shared/ultils/Request/ApiRequest.js'

const getCountries = async (params, onSuccess, onError) => {
    try {
        params = cleanObject(params);

        const { data } = await httpClient.get(API.SEARCH_COUNTRY, { params: params });

        if (onSuccess) {
            return onSuccess(data);
        }
    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        if (onError) {
            return onError();
        }
    }
}

const createNewCountry = async (country, onSuccess, onError) => {
    try {
        await httpClient.post(API.CREATE_COUNTRY, country);

        alertNotify.success(COUNTRY_TEXT_CONFIG.CREATE_COUNTRY_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        if (onError) {
            return onError();
        }
    }
}

const updateCountry = async (country, onSuccess, onError) => {
    try {
        await httpClient.put(API.UPDATE_COUNTRY, country);

        alertNotify.success(COUNTRY_TEXT_CONFIG.UPDATE_COUNTRY_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        if (onError) {
            return onError();
        }
    }
}
const deleteCountry = async (id, onSuccess, onError) => {
    try {
        await httpClient.delete(`${API.DELETE_COUNTRY}${id}`);

        alertNotify.error(COUNTRY_TEXT_CONFIG.DELETE_COUNTRY_SUCCESS_MSG);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (errorMessage) {
        alertNotify.error(errorMessage);
    }
}

export {
    getCountries,
    createNewCountry,
    updateCountry,
    deleteCountry
}