import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify.js';

const getCities = async (params, onSuccess, onError) => {
    try {
        const url = new URL("http://localhost:5000/api/city/search");

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
        alertNotify.error(error);
        if (onError) {
            return onError();
        }
    }
}
const createNewCity = async (city, onSuccess, onError) => {
    try {
        await fetch("http://localhost:5000/api/city/create", {
            method: "POST",
            body: JSON.stringify(city),
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

const updateCity = async (city, onSuccess, onError) => {
    try {
        await fetch("http://localhost:5000/api/city/update", {
            method: "PUT",
            body: JSON.stringify(city),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.success("Update the city success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const deleteCity = async (id, onSuccess, onError) => {
    try {
        await fetch(`http://localhost:5000/api/city/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.error("Delete the city success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const getCountries = async () => {
    try {
        const url = new URL("http://localhost:5000/api/country/getAll");
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(res.status);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export {
    getCities,
    createNewCity,
    updateCity,
    deleteCity,
    getCountries
}