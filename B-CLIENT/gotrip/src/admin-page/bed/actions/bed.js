import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify';
import { API } from '../constants/api';
import httpClient from '../../../shared/ultils/Request/ApiRequest.js';
import store from '../../../store/index.js';
import { BED_TEXT_CONFIG } from '../constants/resources';
import types from '../constants/types';

export const getBeds = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.BED_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const data = await fetchBeds(params);

        dispatch({
            type: types.BED_FETCH_SUCCESS,
            payload: {
                total: data.total,
                beds: data.beds
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.BED_FETCH_ERROR, payload: null });
    }
}

export const createNewBed = (bed, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.BED_SAVING, payload: null });

        await httpClient.post(API.CREATE_BED, bed);

        alertNotify.success(BED_TEXT_CONFIG.CREATE_BED_SUCCESS_MSG);
        dispatch({ type: types.BED_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        dispatch({ type: types.BED_SAVE_FAILED, payload: null });
        alertNotify.error(errorMessage);
    }
}

export const updateBed = (bed, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.BED_SAVING, payload: null });

        await httpClient.put(API.UPDATE_BED, bed);

        alertNotify.success(BED_TEXT_CONFIG.UPDATE_BED_SUCCESS_MSG);
        dispatch({ type: types.BED_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({ type: types.BED_SAVE_FAILED, payload: null });
    }
}

export const deleteBed = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_BED}/${id}`);

        dispatch({ type: BED_DELETED_SUCCESS, payload: null });
        
        alertNotify.error(BED_TEXT_CONFIG.DELETE_BED_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (bed) => async dispatch => {
    dispatch({
        type: types.BED_MODAL_SHOW,
        payload: {
            bed: bed
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.BED_MODAL_CLOSE,
        payload: null
    });
}

async function fetchBeds(params) {
    try {
        const { searchParams, options } = store.getState()?.bed;
        params = params || { ...searchParams, ...options };

        const { data } = await httpClient.get(API.SEARCH_BED, { params });

        return data;
    } catch (exp) {
        console.log(exp);
    }
}