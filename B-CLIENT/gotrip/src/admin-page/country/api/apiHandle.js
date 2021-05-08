import { cleanObject } from '../../shared/ultils/ultils';

const getCountries = async (params) => {
    try {
        const url = new URL("http://localhost:5000/api/country/search");

        params = cleanObject(params);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(res.status);
        }
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
const createNewCountry = async (country) => {
    try {
        await fetch("http://localhost:5000/api/country/create", {
            method: "POST",
            body: JSON.stringify(country),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    } catch(error) {
        console.log(error);
    }
}

const updateCountry = async (country) => {
    try {
        await fetch("http://localhost:5000/api/country/update", {
            method: "PUT",
            body: JSON.stringify(country),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    } catch {
        console.log(error);
    }
}
const deleteCountry = async (id) => {
    try {
        await fetch(`http://localhost:5000/api/country/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    } catch {
        console.log(error);
    }
}

export {
    getCountries,
    createNewCountry,
    updateCountry,
    deleteCountry
}