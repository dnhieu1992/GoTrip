import types from "../constant/types";

const initialState={
    properties:[]
}

function propertyManagementReducer(state=initialState, action){
    const {type,payload}=action;

    switch(type){
        case types.MNG_GET_PROPERTY_SUCCESS:
            return {
                ...state,
                properties: payload.properties
            };
        case types.MNG_GET_PROPERTY_ERROR:
            return {
                ...state

            };
        default: return state;
    }
}

export default propertyManagementReducer;