import mongoose from 'mongoose';
import db from '../models/index.js';
import {
    duplicatedResponse,
    errorResponse,
    successResponse,
    badRequestResponse
} from '../shared/response.js';
import { ERROR_MSG } from '../constants/messages.js';
import { cleanObject, searchQuery } from '../shared/ultils.js';
import { SORT_DIRECTION } from '../constants/constants.js';

function createRoomName(req, res) {
    const {
        name,
        roomTypeId,
        status = "Disabled"
    } = req.body;

    if (!name || !roomTypeId) {
        return badRequestResponse(res, '');
    }

    db.RoomName.findOne({ name: name, roomType_id: roomTypeId }).then((roomName) => {
        if (roomName) return duplicatedResponse(res, ERROR_MSG.COUNTRY_EXISTS);

        const newRoomName = new db.RoomName({
            _id: mongoose.Types.ObjectId(),
            name: name,
            roomType: roomTypeId,
            status: status,
        });

        newRoomName.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })

    })
}

function search(req, res) {
    const queryObject = cleanObject(req.query);

    const query = searchQuery(queryObject);

    if (queryObject.roomTypeId) {
        query["roomType"] = mongoose.Types.ObjectId(queryObject.roomTypeId);
    }

    delete query['roomTypeId'];

    const {
        pageNumber,
        pageSize,
        sortDirection,
        sortField = "name"
    } = queryObject;

    const sortObject = {};
    sortObject[sortField] = sortDirection === SORT_DIRECTION.ASC ? 1 : -1;

    db.RoomName.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .populate('roomType')
        .exec((err, roomNames) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.RoomName.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    roomNames: roomNames
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.RoomName.findOne({ _id: req.params.id })
        .populate('roomType')
        .then(roomName => {
            return successResponse(res, roomName);
        }).catch((error) => {
            return errorResponse(res, error);
        })
}

function updateRoomName(req, res) {
    const {
        id,
        name,
        roomTypeId,
        status = "Disabled"
    } = req.body;

    if (!id || !roomTypeId) {
        return badRequestResponse(res, '');
    }

    const roomNameUpdate = {
        name: name,
        roomType: roomTypeId,
        status: status
    };

    db.RoomName.findOneAndUpdate({ _id: id }, { $set: roomNameUpdate }, {}, function (err, roomName) {
        // now you can send the error or updated file to client
        if (err)
            return errorResponse(res, error);

        return successResponse(res, "Update success");
    });
}
function deleteRoomName(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.RoomName.findByIdAndRemove({ _id: req.params.id }).then(() => {
        return successResponse(res, "Delete success");
    }).catch(err => {
        return errorResponse(res, err);;
    });
}

export {
    search,
    getById,
    createRoomName,
    updateRoomName,
    deleteRoomName
}