import { API } from '../constant/api';
import axios from 'axios';
import userService from '../../../shared/services/userSerivce';

const loginUser = async (user, onSuccess, onError) => {
    try {
        debugger;
        const {data} = await axios.post(API.LOGIN_USER, user);

        userService.storeUser(data);

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        if (onError) {
            return onError(error);
        }
    }
}

export {
    loginUser,
}