import alertNotify from "../../../shared/ultils/alertNotify";
import httpClient from "../../../shared/ultils/Request/ApiRequest";
import { cleanObject } from "../../shared/ultils/ultils";
import { API } from "../constants/api";
import { AMENITY_CATEGORY_TEXT_CONFIG } from "../constants/resources";
import types from "../constants/types";

export const getAmenityCategories = (searchParams = {}, options = {}) => async dispatch => {
    try {
        const params = cleanObject({ ...searchParams, ...options });

        dispatch({
            type: types.AMENITY_CATEGORY_FETCHING,
            payload: {
                searchParams: searchParams,
                options: options
            }
        });

        const { data } = await httpClient.get(API.SEARCH_AMENITY_CATEGORY, { params });

        dispatch({
            type: types.AMENITY_CATEGORY_FETCH_SUCCESS,
            payload: {
                total: data?.total,
                amenityCategories: data?.amenityCategories
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.AMENITY_CATEGORY_FETCH_ERROR, payload: null });
    }
}

export const createNewAmenityCategory = (amenityCategory = {}) => async dispatch => {
    try {
        dispatch({ type: types.AMENITY_CATEGORY_SAVING, payload: null });

        await httpClient.post(API.CREATE_AMENITY_CATEGORY, amenityCategory);

        alertNotify.success(AMENITY_CATEGORY_TEXT_CONFIG.CREATE_AMENITY_CATEGORY_SUCCESS_MSG);
        dispatch({ type: types.AMENITY_CATEGORY_SAVE_SUCCESS, payload: null });

    } catch (errorMessage) {
        dispatch({ type: types.AMENITY_CATEGORY_SAVE_FAILED, payload: null });
        alertNotify.error(errorMessage);
    }
}

export const updateAmenityCategory = (amenityCategory, options = {}) => async dispatch => {
    try {
        dispatch({ type: types.AMENITY_CATEGORY_SAVING, payload: null });

        await httpClient.put(API.UPDATE_AMENITY_CATEGORY, amenityCategory);

        alertNotify.success(AMENITY_CATEGORY_TEXT_CONFIG.UPDATE_AMENITY_CATEGORY_SUCCESS_MSG);
        dispatch({ type: types.AMENITY_CATEGORY_SAVE_SUCCESS, payload: null });

        if (options.onSuccess) {
            return options.onSuccess();
        }

    } catch (errorMessage) {
        alertNotify.error(errorMessage);
        dispatch({ type: types.AMENITY_CATEGORY_SAVE_FAILED, payload: null });
    }
}

export const deleteAmenityCategory = (id) => async dispatch => {
    try {
        await httpClient.delete(`${API.DELETE_AMENITY_CATEGORY}/${id}`);

        dispatch({ type: types.AMENITY_CATEGORY_DELETED_SUCCESS, payload: null });

        alertNotify.error(AMENITY_CATEGORY_TEXT_CONFIG.DELETE_AMENITY_CATEGORY_SUCCESS_MSG);
    } catch (exp) {
        console.log(exp);
        alertNotify.error(exp?.message || '');
    }
}

export const showModal = (amenityCategory) => async dispatch => {
    dispatch({
        type: types.AMENITY_CATEGORY_MODAL_SHOW,
        payload: {
            amenityCategory: amenityCategory
        }
    });
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: types.AMENITY_CATEGORY_MODAL_CLOSE,
        payload: null
    });
}