import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify';
import { API } from '../constants/api';
import httpClient from '../../../shared/ultils/Request/ApiRequest.js';
import store from '../../../store/index.js';
import { COUNTRY_TEXT_CONFIG } from '../constants/resources';
import {
    COUNTRY_FETCHING,
    COUNTRY_FETCH_SUCCESS,
    COUNTRY_FETCH_ERROR,
    COUNTRY_MODAL_SHOW,
    COUNTRY_MODAL_CLOSE,
    COUNTRY_SAVE_SUCCESS,
    COUNTRY_SAVING,
    COUNTRY_SAVE_FAILED,
    COUNTRY_DELETED_SUCCESS
} from '../constants/types';

export const getCountries = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: COUNTRY_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const data = await fetCountries(params);

        dispatch({
            type: COUNTRY_FETCH_SUCCESS,
            payload: {
                total: data.total,
                countries: data.countries
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: COUNTRY_FETCH_ERROR, payload: null });
    }
}

export const createNewCountry = (country, options = {}) => async dispatch => {
    try {
        dispatch({ type: COUNTRY_SAVING, payload: null });

        await httpClient.post(API.CREATE_COUNTRY, country);

        alertNotify.success(COUNTRY_TEXT_CONFIG.CREATE_COUNTRY_SUCCESS_MSG);
        dispatch({ type: COUNTRY_SAVE_SUCCESS, payload: null });

    } catch (errorMessage) {
        dispatch({ type: COUNTRY_SAVE_FAILED, payload: null });
        alertNotify.error(errorMessage);
    }
}

export const updateCountry = (country, options = {}) => async dispatch => {
    try {
        dispatch({ type: COUNTRY_SAVING, payload: null });

        await httpClient.put(API.UPDATE_COUNTRY, country);
        //const data = fetchCountries

        alertNotify.success(COUNTRY_TEXT_CONFIG.UPDATE_COUNTRY_SUCCESS_MSG);
        dispatch({ type: COUNTRY_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({ type: COUNTRY_SAVE_FAILED, payload: null });
    }
}

export const deleteCountry = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_COUNTRY}/${id}`);

        const data = await fetCountries();

        dispatch({ type: COUNTRY_DELETED_SUCCESS, payload: data });

        alertNotify.error(COUNTRY_TEXT_CONFIG.DELETE_COUNTRY_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (country) => async dispatch => {
    dispatch({
        type: COUNTRY_MODAL_SHOW,
        payload: {
            country: country
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: COUNTRY_MODAL_CLOSE,
        payload: null
    });
}

async function fetCountries(params) {
    try {
        const { searchParams, options } = store.getState()?.country;
        params = params || { ...searchParams, ...options };

        const { data } = await httpClient.get(API.SEARCH_COUNTRY, { params });

        return data;
    } catch (exp) {
        console.log(exp);
    }
}