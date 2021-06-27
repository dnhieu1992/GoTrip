import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";
import { API } from "../constants/api";
import { PROPERTY_TEXT_CONFIG } from "../constants/resources";
import types from '../constants/types';
import httpClient from '../../../shared/ultils/Request/ApiRequest.js';

export const getProperties = (searchParams = {}, options = {}) => async dispatch => {
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