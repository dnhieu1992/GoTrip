import { cleanObject } from '../../shared/ultils/ultils';
import alertNotify from '../../../shared/ultils/alertNotify.js';

const getBeds = async (params, onSuccess, onError) => {
    try {
        const url = new URL("http://localhost:5000/api/bed/search");

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

const createNewBed = async (bed, onSuccess, onError) => {
    try {
        const res = await fetch("http://localhost:5000/api/bed/create", {
            method: "POST",
            body: JSON.stringify(bed),
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw "The item exists.";
        }

        alertNotify.success("Create new a bed success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const updateBed = async (bed, onSuccess, onError) => {
    try {
        await fetch("http://localhost:5000/api/bed/update", {
            method: "PUT",
            body: JSON.stringify(bed),
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        alertNotify.success("Update the bed success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const deleteBed = async (id, onSuccess, onError) => {
    try {
        await fetch(`http://localhost:5000/api/bed/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset = UTF-8" }
        });

        alertNotify.success("Delete the bed success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

export {
    getBeds,
    createNewBed,
    updateBed,
    deleteBed,
}