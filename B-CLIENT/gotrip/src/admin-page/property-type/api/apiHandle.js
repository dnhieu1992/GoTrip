import alertNotify from "../../../shared/ultils/alertNotify";
import { cleanObject } from "../../shared/ultils/ultils";

const getPropertyTypes = async (params) => {
    try {
        const url = new URL("http://localhost:5000/api/propertyType/search");

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

const createPropertyType = async (propertyType) => {
    try {
        await fetch("http://localhost:5000/api/propertyType/create", {
            method: "POST",
            body: JSON.stringify(propertyType),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.success("create property type success");
    } catch {
        console.log(error);
    }
}

const updatePropertyType = async (propertyType) => {
    try {
        await fetch("http://localhost:5000/api/propertyType/update", {
            method: "PUT",
            body: JSON.stringify(propertyType),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.success("Update property type sucess");
    } catch {
        console.log(error);
    }
}

const deletePropertyType = async (id) => {
    try {
        await fetch(`http://localhost:5000/api/propertyType/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertNotify.error("Delete property type success");
    } catch {
        console.log(error);
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