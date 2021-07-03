import alertNotify from "../../../shared/ultils/alertNotify";
import httpClient from "../../../shared/ultils/Request/ApiRequest";
import { cleanObject } from "../../shared/ultils/ultils"
import { API } from "../constants/api";
import { PROPERTY_TYPE_TEXT_CONFIG } from "../constants/resources";
import types from "../constants/types";

export const getPropertyTypes = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.PROPERTY_TYPE_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const { data } = await httpClient.get(API.SEARCH_PROPERTY_TYPE, { params });

        const propertyTypes = data.propertyTypes.map(propertyType=>{
            return{
                ...propertyType,
                propertyName:propertyType?.property?.name
            }
        })

        dispatch({
            type: types.PROPERTY_TYPE_FETCH_SUCCESS,
            payload: {
                total: data?.total,
                propertyTypes:propertyTypes
                
            }
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.PROPERTY_TYPE_FETCH_ERROR, payload: null });
    }
}

export const createNewPropertyType = (propertyType = {}) => async dispatch => {
    try {
        dispatch({
            type: types.PROPERTY_TYPE_SAVING,
            payload: null
        });

        await httpClient.post(API.CREATE_PROPERTY_TYPE, propertyType);

        alertNotify.success(PROPERTY_TYPE_TEXT_CONFIG.CREATE_PROPERTY_TYPE_SUCCESS_MSG);

        dispatch({
            type: types.PROPERTY_TYPE_SAVE_SUCCESS,
            payload: null
        });

    } catch (errorMessage) {
        dispatch({
            type: types.PROPERTY_TYPE_SAVE_FAILED,
            payload: null
        });
        alertNotify.error(errorMessage);
    }
}

export const updatePropertyType = (propertyType, options = {}) => async dispatch => {
    try {
        dispatch({
            type: types.PROPERTY_TYPE_SAVING,
            payload: null
        });

        await httpClient.put(API.UPDATE_PROPERTY_TYPE, propertyType);

        alertNotify.success(PROPERTY_TYPE_TEXT_CONFIG.UPDATE_PROPERTY_TYPE_SUCCESS_MSG);

        dispatch({
            type: types.PROPERTY_TYPE_SAVE_SUCCESS,
            payload: null
        });

        if (options.onSuccess) {
            return options.onSuccess();
        }
    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({
            type: types.PROPERTY_TYPE_SAVE_FAILED,
            payload: null
        });
    }
}

export const deletePropertyType = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_PROPERTY_TYPE}/${id}`);

        dispatch({
            type: types.PROPERTY_TYPE_DELETED_SUCCESS,
            payload: null
        });

        alertNotify.error(PROPERTY_TYPE_TEXT_CONFIG.DELETE_PROPERTY_TYPE_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (propertyType) => async dispatch => {
    dispatch({
        type: types.PROPERTY_TYPE_MODAL_SHOW,
        payload: {
            propertyType: propertyType
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.PROPERTY_TYPE_MODAL_CLOSE,
        payload: null
    });
}

export const getProperties = () => async dispatch => {
    try {
        const { data } = await httpClient.get(API.GET_PROPERTIES);
        dispatch({
            type: types.GET_PROPERTY_SUCCESS,
            payload: {
                properties: data
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: types.GET_PROPERTY_ERROR,
            payload: null
        });
    }
}

