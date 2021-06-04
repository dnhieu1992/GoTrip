import { API } from '../constant/api';

const loginUser = async (account, onSuccess, onError) => {
    try {
        debugger
        const data = await fetch(API.LOGIN_USER, {
            method: "POST",
            body: JSON.stringify(account),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        console.log(error);
        debugger
        if (onError) {
            return onError();
        }
    }
}

export {
    loginUser,
}