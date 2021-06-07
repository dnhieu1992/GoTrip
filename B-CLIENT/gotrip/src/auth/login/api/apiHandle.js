import { API } from '../constant/api';

const loginUser = async (account, onSuccess, onError) => {
    try {
        const res = await fetch(API.LOGIN_USER, {
            method: "POST",
            body: JSON.stringify(account),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const data = await res.json();

        localStorage.setItem('User', JSON.stringify(data.token));
        
        if (!res.ok && res.status === 401) {
            throw data.error
        }

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