import mongoose from 'mongoose';
import db from '../models/index.js';
import { ERROR_MSG } from '../constants/messages.js';
import {
    duplicatedResponse,
    errorResponse,
    successResponse,
    badRequestResponse,
    notFoundResponse
} from '../shared/response.js';
import { cleanObject, searchQuery } from '../shared/ultils.js';
import { SORT_DIRECTION } from '../constants/constants.js';

function createRoomType(req, res) {
    const {
        name,
        description,
        status = "Disabled"
    } = req.body;

    if (!name) {
        return badRequestResponse(res, '');
    }

    db.RoomType.findOne({ name: name }).then((roomType) => {
        if (roomType) return duplicatedResponse(res, ERROR_MSG.ITEM_EXISTS);

        const newRoomType = new db.RoomType({
            _id: mongoose.Types.ObjectId(),
            name,
            description,
            status: status
        });

        newRoomType.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

function getAll(req, res) {
    db.RoomType.find({ status: "Actived" })
        .exec((err, roomTypes) => {
            if (err) {
                return errorResponse(res, err);
            }
            return successResponse(res, roomTypes);
        });
}

function search(req, res) {
    const queryObject = cleanObject(req.query);
    const query = searchQuery(queryObject)

    const {
        pageNumber,
        pageSize,
        sortDirection,
        sortField = "name"
    } = queryObject;

    const sortObject = {};
    sortObject[sortField] = sortDirection === SORT_DIRECTION.ASC ? 1 : -1;

    db.RoomType.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, properties) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.RoomType.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    properties: properties
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The RoomType not found");
    }

    db.RoomType.findOne({ _id: req.params.id }).then(roomType => {
        return successResponse(res, roomType);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateRoomType(req, res) {
    const {
        id,
        name,
        description,
        status
    } = req.body;

    if (!id) {
        return badRequestResponse(res, 'The id not found.');
    }

    const roomTypeUpdate = {
        name,
        status,
        description
    };

    db.RoomType.findOneAndUpdate({ _id: id }, roomTypeUpdate).then((result) => {
        return successResponse(res, "Update success");
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deleteRoomType(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The RoomType not found");
    }

    db.RoomType.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, "Delete success");
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    getAll,
    search,
    getById,
    createRoomType,
    updateRoomType,
    deleteRoomType
}