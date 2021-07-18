import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify';
import { API } from '../constants/api';
import httpClient from '../../../shared/ultils/Request/ApiRequest.js';
import store from '../../../store/index.js';
import { AMENITY_TEXT_CONFIG } from '../constants/resources';
import types from '../constants/types';

export const getAmenities = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.AMENITY_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const data = await fetchAmenities(params);

        dispatch({
            type: types.AMENITY_FETCH_SUCCESS,
            payload: {
                total: data.data.total,
                amenities: data.amenities
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.AMENITY_FETCH_ERROR, payload: null });
    }
}

export const createNewAmenity = (amenity, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.AMENITY_SAVING, payload: null });

        await httpClient.post(API.CREATE_AMENITY, amenity);

        alertNotify.success(AMENITY_TEXT_CONFIG.CREATE_AMENITY_SUCCESS_MSG);
        dispatch({ type: types.AMENITY_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        dispatch({ type: types.AMENITY_SAVE_FAILED, payload: null });
        alertNotify.error(errorMessage);
    }
}

export const updateAmenity = (amenity, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.AMENITY_SAVING, payload: null });

        await httpClient.put(API.UPDATE_AMENITY, amenity);

        alertNotify.success(AMENITY_TEXT_CONFIG.UPDATE_AMENITY_SUCCESS_MSG);
        dispatch({ type: types.AMENITY_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({ type: types.AMENITY_SAVE_FAILED, payload: null });
    }
}

export const deleteAmenity = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_AMENITY}/${id}`);

        dispatch({ type: AMENITY_DELETED_SUCCESS, payload: null });

        alertNotify.error(AMENITY_TEXT_CONFIG.DELETE_AMENITY_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (amenity) => async dispatch => {
    dispatch({
        type: types.AMENITY_MODAL_SHOW,
        payload: {
            amenity: amenity
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.AMENITY_MODAL_CLOSE,
        payload: null
    });
}

async function fetchAmenities(params) {
    try {
        const { searchParams, options } = store.getState()?.amenity;
        params = params || { ...searchParams, ...options };

        const { data } = await httpClient.get(API.SEARCH_AMENITY, { params });

        const amenities = data.amenities.map(amenity => {
            return {
                ...amenity,
                amenityCategoryName: amenity?.amenityCategory?.name
            }
        })

        return { amenities, data };
    } catch (exp) {
        console.log(exp);
    }
}

export const getAmenityCategories = () => async dispatch => {
    try {
        const { data } = await httpClient.get(API.GET_AMENITYCATEGORIES);

        dispatch({
            type: types.GET_AMENITYCATEGORY_SUCCESS,
            payload: {
                amenityCategories: data
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: types.GET_AMENITYCATEGORY_ERROR,
            payload: null
        });
    }
}