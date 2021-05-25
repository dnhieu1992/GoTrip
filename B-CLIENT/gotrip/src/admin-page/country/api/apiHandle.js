import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify.js';

const getCountries = async (params, onSuccess, onError) => {
    try {
        const url = new URL("http://localhost:5000/api/country/search");

        params = cleanObject(params);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(res.status);
        }

        const data = await res.json();
        if (onSuccess) {
            return onSuccess(data);
        }
    } catch (error) {
        alertNotify.error(error.message);
        if (onError) {
            return onError();
        }
    }
}

const createNewCountry = async (country, onSuccess, onError) => {
    try {
        const res = await fetch("http://localhost:5000/api/country/create", {
            method: "POST",
            body: JSON.stringify(country),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw "The item exists.";
        }

        alertNotify.success("Create new a country success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const updateCountry = async (country, onSuccess, onError) => {
    try {
        await fetch("http://localhost:5000/api/country/update", {
            method: "PUT",
            body: JSON.stringify(country),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.success("Update the country success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error){
        alertNotify.error(error);
    }
}
const deleteCountry = async (id, onSuccess, onError) => {
    try {
        await fetch(`http://localhost:5000/api/country/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.error("Delete the country success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error)
    }
}

export {
    getCountries,
    createNewCountry,
    updateCountry,
    deleteCountry
}