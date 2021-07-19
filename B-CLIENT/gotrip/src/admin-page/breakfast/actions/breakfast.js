import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify';
import { API } from '../constants/api';
import httpClient from '../../../shared/ultils/Request/ApiRequest.js';
import store from '../../../store/index.js';
import { BREAKFAST_TEXT_CONFIG } from '../constants/resources';
import types from '../constants/types';

export const getBreakfasts = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.BREAKFAST_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const data = await fetchBreakfasts(params);

        dispatch({
            type: types.BREAKFAST_FETCH_SUCCESS,
            payload: {
                total: data.total,
                breakfasts: data.breakfasts
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.BREAKFAST_FETCH_ERROR, payload: null });
    }
}

export const createNewBreakfast = (breakfast, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.BREAKFAST_SAVING, payload: null });

        await httpClient.post(API.CREATE_BREAKFAST, breakfast);

        alertNotify.success(BREAKFAST_TEXT_CONFIG.CREATE_BREAKFAST_SUCCESS_MSG);
        dispatch({ type: types.BREAKFAST_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        dispatch({ type: types.BREAKFAST_SAVE_FAILED, payload: null });
        alertNotify.error(errorMessage);
    }
}

export const updateBreakfast = (breakfast, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.BREAKFAST_SAVING, payload: null });

        await httpClient.put(API.UPDATE_BREAKFAST, breakfast);

        alertNotify.success(BREAKFAST_TEXT_CONFIG.UPDATE_BREAKFAST_SUCCESS_MSG);
        dispatch({ type: types.BREAKFAST_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({ type: types.BREAKFAST_SAVE_FAILED, payload: null });
    }
}

export const deleteBreakfast = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_BREAKFAST}/${id}`);

        dispatch({ type: BREAKFAST_DELETED_SUCCESS, payload: null });
        
        alertNotify.error(BREAKFAST_TEXT_CONFIG.DELETE_BREAKFAST_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (breakfast) => async dispatch => {
    dispatch({
        type: types.BREAKFAST_MODAL_SHOW,
        payload: {
            breakfast: breakfast
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.BREAKFAST_MODAL_CLOSE,
        payload: null
    });
}

async function fetchBreakfasts(params) {
    try {
        const { searchParams, options } = store.getState()?.breakfast;
        params = params || { ...searchParams, ...options };

        const { data } = await httpClient.get(API.SEARCH_BREAKFAST, { params });

        return data;
    } catch (exp) {
        console.log(exp);
    }
}