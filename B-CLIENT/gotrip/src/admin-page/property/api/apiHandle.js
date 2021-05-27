import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";

const getProperties = async (params, onSuccess, onError) => {
    try {
        const url = new URL("http://localhost:5000/api/property/search");

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

const createNewProperty = async (property, onSuccess) => {
    try {
        const res = await fetch("http://localhost:5000/api/property/create", {
            method: "POST",
            body: JSON.stringify(property),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw "The item exists.";
        }

        alertNotify.success("Create new a property seccess");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const updateProperty = async (property, onSuccess) => {
    try {
        await fetch("http://localhost:5000/api/property/update", {
            method: "PUT",
            body: JSON.stringify(property),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.success("Update the property success");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const deleteProperty = async (id, onSuccess) => {
    try {
        await fetch(`http://localhost:5000/api/property/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.error("Delete the property success");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

export {
    getProperties,
    createNewProperty,
    updateProperty,
    deleteProperty
}