const getCities = async (params) => {
    try {
        const url = new URL("http://localhost:5000/api/city/search");
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
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
const createNewCity = async (city) => {
    try {
        await fetch("http://localhost:5000/api/city/create", {
            method: "POST",
            body: JSON.stringify(city),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    } catch {
        console.log(error);
    }
}

const updateCity = async (city) => {
    try {
        await fetch("http://localhost:5000/api/city/update", {
            method: "PUT",
            body: JSON.stringify(city),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    } catch {
        console.log(error);
    }
}

const deleteCity = async (id) => {
    try {
        await fetch(`http://localhost:5000/api/city/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    } catch {
        console.log(error);
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