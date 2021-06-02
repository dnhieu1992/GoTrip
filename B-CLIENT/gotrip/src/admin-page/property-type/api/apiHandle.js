import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";

const getPropertyTypes = async (params, onSuccess, onError) => {
    try {
        const url = new URL("http://localhost:5000/api/propertyType/search");

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

const createPropertyType = async (propertyType, onSuccess) => {
    try {
        await fetch("http://localhost:5000/api/propertyType/create", {
            method: "POST",
            body: JSON.stringify(propertyType),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw "The item exists";
        }

        alertNotify.success("create property type success");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const updatePropertyType = async (propertyType, onSuccess) => {
    try {
        await fetch("http://localhost:5000/api/propertyType/update", {
            method: "PUT",
            body: JSON.stringify(propertyType),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.success("Update property type success");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const deletePropertyType = async (id, onSuccess) => {
    try {
        await fetch(`http://localhost:5000/api/propertyType/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.error("Delete property type success");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const getProperties = async () => {
    try {
        const url = new URL("http:localhost:5000/api/property/getAll");
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
    getPropertyTypes,
    createPropertyType,
    updatePropertyType,
    deletePropertyType,
    getProperties
}