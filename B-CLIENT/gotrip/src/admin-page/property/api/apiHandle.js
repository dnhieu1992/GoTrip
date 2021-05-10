import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";

const getProperties = async (params) => {
    try {
        const url = new URL("http://localhost:5000/api/property/search");

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

const createNewProperty = async (property) => {
    try {
        await fetch("http://localhost:5000/api/property/create", {
            method: "POST",
            body: JSON.stringify(property),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.success("Create new a property seccess");
    } catch {
        console.log(error);
    }
}

const updateProperty = async (property) => {
    try {
        await fetch("http://localhost:5000/api/property/update", {
            method: "PUT",
            body: JSON.stringify(property),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.success("Update the property seccess");
    } catch {
        console.log(error);
    }
}

const deleteProperty = async (id) => {
    try {
        await fetch(`http://localhost:5000/api/property/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.error("Delete the property success");
    } catch {
        console.log(error);
    }
}

export {
    getProperties,
    createNewProperty,
    updateProperty,
    deleteProperty
}