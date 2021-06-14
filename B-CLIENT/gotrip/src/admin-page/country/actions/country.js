import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify';
import { API } from '../constants/api';
import { FETCH_COUNTRIES, FETCH_COUNTRIES_SUCCESS } from '../constants/types';

export const getCountries = (params = {}) => async dispatch => {
    try {
        const { searchParam = {}, options = {} } = params;
        const url = new URL(API.SEARCH_COUNTRY);

        const requestParams = cleanObject({ ...searchParam, ...options });
        Object.keys(requestParams).forEach(key => url.searchParams.append(key, requestParams[key]))

        dispatch({
            type: FETCH_COUNTRIES,
            payload: null
        });

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(res.status);
        }

        const data = await res.json();
        setTimeout(() => {
            dispatch({
                type: FETCH_COUNTRIES_SUCCESS,
                payload: {
                    total: data.total,
                    countries: data.countries,
                    searchParam: searchParam,
                    options: options
                }
            });
        }, 300);

    } catch (error) {
        // alertNotify.error(error);
        // if (onError) {
        //     return onError();
        // }
    }
}

export const updateSearchParams = (searchParam, options) => dispatch => {
    dispatch({
        type: FETCH_COUNTRIES,
        payload: { searchParam, options }
    });
}