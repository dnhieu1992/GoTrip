import httpClient from "../../shared/ultils/Request/ApiRequest";
import types from "../constant/types";

export const getProperties = () => async dispatch => {
    try {
        const { data } = await httpClient.get('/property/getAll');
        dispatch({
            type: types.MNG_GET_PROPERTY_SUCCESS,
            payload: {
                properties: data
            }
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: types.MNG_GET_PROPERTY_ERROR,
            payload: null
        });
    }
}