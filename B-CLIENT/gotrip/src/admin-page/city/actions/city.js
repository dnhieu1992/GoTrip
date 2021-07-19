import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify';
import { API } from '../constants/api';
import httpClient from '../../../shared/ultils/Request/ApiRequest.js';
import store from '../../../store/index.js';
import { CITY_TEXT_CONFIG } from '../constants/resources';
import types from '../constants/types';

export const getCities = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.CITY_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const data = await fetchCities(params);

        dispatch({
            type: types.CITY_FETCH_SUCCESS,
            payload: {
                total: data.data.total,
                cities: data.cities
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.CITY_FETCH_ERROR, payload: null });
    }
}

export const createNewCity = (city, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.CITY_SAVING, payload: null });

        await httpClient.post(API.CREATE_CITY, city);

        alertNotify.success(CITY_TEXT_CONFIG.CREATE_CITY_SUCCESS_MSG);
        dispatch({ type: types.CITY_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        dispatch({ type: types.CITY_SAVE_FAILED, payload: null });
        alertNotify.error(errorMessage);
    }
}

export const updateCity = (city, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.CITY_SAVING, payload: null });

        await httpClient.put(API.UPDATE_CITY, city);

        alertNotify.success(CITY_TEXT_CONFIG.UPDATE_CITY_SUCCESS_MSG);
        dispatch({ type: types.CITY_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({ type: types.CITY_SAVE_FAILED, payload: null });
    }
}

export const deleteCity = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_CITY}/${id}`);

        dispatch({ type: CITY_DELETED_SUCCESS, payload: null });

        alertNotify.error(CITY_TEXT_CONFIG.DELETE_CITY_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (city) => async dispatch => {
    dispatch({
        type: types.CITY_MODAL_SHOW,
        payload: {
            city: city
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.CITY_MODAL_CLOSE,
        payload: null
    });
}

async function fetchCities(params) {
    try {
        const { searchParams, options } = store.getState()?.city;
        params = params || { ...searchParams, ...options };

        const { data } = await httpClient.get(API.SEARCH_CITY, { params });

        const cities = data.cities.map(city => {
            return {
                ...city,
                countryName: city?.country?.name
            }
        })

        return { cities, data };
    } catch (exp) {
        console.log(exp);
    }
}

export const getCountries = () => async dispatch => {
    try {
        const { data } = await httpClient.get(API.GET_COUNTRIES);
        dispatch({
            type: types.GET_COUNTRY_SUCCESS,
            payload: {
                countries: data
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: types.GET_COUNTRY_ERROR,
            payload: null
        });
    }
}