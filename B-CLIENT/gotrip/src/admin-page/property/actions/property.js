import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";
import { API } from "../constants/api";
import { PROPERTY_TEXT_CONFIG } from "../constants/resources";
import types from '../constants/types';
import httpClient from '../../../shared/ultils/Request/ApiRequest.js';

export const getProperties = (searchParams = {}, options = {}) => async dispatch => {
    debugger
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.PROPERTY_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const { data } = await httpClient.get(API.SEARCH_PROPERTY, { params });

        dispatch({
            type: types.PROPERTY_FETCH_SUCCESS,
            payload: {
                total: data?.total,
                properties: data?.properties
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.PROPERTY_FETCH_ERROR, payload: null });
    }
}

export const createNewProperty = (property = {}) => async dispatch => {
    try {
        dispatch({ type: types.PROPERTY_SAVING, payload: null });

        await httpClient.post(API.CREATE_PROPERTY, property);

        alertNotify.success(PROPERTY_TEXT_CONFIG.CREATE_PROPERTY_SUCCESS_MSG);
        dispatch({ type: types.PROPERTY_SAVE_SUCCESS, payload: null });

    } catch (errorMessage) {
        dispatch({ type: types.PROPERTY_SAVE_FAILED, payload: null });
        alertNotify.error(errorMessage);
    }
}

export const updateProperty = (property, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.PROPERTY_SAVING, payload: null });

        await httpClient.put(API.UPDATE_PROPERTY, property);

        alertNotify.success(PROPERTY_TEXT_CONFIG.UPDATE_PROPERTY_SUCCESS_MSG);
        dispatch({ type: types.PROPERTY_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({ type: types.PROPERTY_SAVE_FAILED, payload: null });
    }
}

export const deleteProperty = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_PROPERTY}/${id}`);

        dispatch({ type: types.PROPERTY_DELETED_SUCCESS, payload: null });

        alertNotify.error(PROPERTY_TEXT_CONFIG.DELETE_PROPERTY_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (property) => async dispatch => {
    dispatch({
        type: types.PROPERTY_MODAL_SHOW,
        payload: {
            property: property
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.PROPERTY_MODAL_CLOSE,
        payload: null
    });
}