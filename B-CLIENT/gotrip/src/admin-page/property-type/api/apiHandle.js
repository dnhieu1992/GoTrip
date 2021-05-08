const getPropertyTypes = async (params) => {
    try {
        const url = new URL("http://localhost:5000/api/propertyType/search");
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        console.log("data",data)
        return data;
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
    } catch {
        console.log(error);
    }
}

const getProperties = async () => {
    try {
        const url = new URL("http:localhost:5000/api/property/getAll");
        const res = await fetch(url);
        if(!res.ok) {
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