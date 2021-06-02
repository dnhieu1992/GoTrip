import alertNotify from '../../../shared/ultils/alertNotify.js';
import { cleanObject } from '../../shared/ultils/ultils';

const getRoomTypes = async (params, onSuccess, onError) => {
    try {
        const url = new URL("http://localhost:5000/api/roomType/search");

        params = cleanObject(params);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

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

const createNewRoomType = async (roomType, onSuccess) => {
    try {
        const res = await fetch("http://localhost:5000/api/roomType/create", {
            method: "POST",
            body: JSON.stringify(roomType),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        if (!res.ok && res.status === 409) {
            throw "The item exists.";
        }

        alertNotify.success("Create new a Room Type success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const updateRoomType = async (roomType, onSuccess) => {
    try {
        await fetch("http://localhost:5000/api/roomType/update", {
            method: "PUT",
            body: JSON.stringify(roomType),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        alertNotify.success("Update the Room Type success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

const deleteRoomType = async (id, onSuccess) => {
    try {
        await fetch(`http://localhost:5000/api/roomType/delete/${id}`, {
            method: "DELETE",
            header: { "Content-type": "application/json;charset=UTF-8" }
        });

        alertNotify.error("Delete the Room Type success.");

        if (onSuccess) {
            return onSuccess();
        }
    } catch (error) {
        alertNotify.error(error);
    }
}

export {
    getRoomTypes,
    createNewRoomType,
    updateRoomType,
    deleteRoomType
}