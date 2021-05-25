import mongoose from 'mongoose';
import multer from 'multer';
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

function createProperty(req, res) {
    const {
        name,
        description,
        status = "Disabled"
    } = req.body;

    if (!name) {
        return badRequestResponse(res, '');
    }

    db.Property.findOne({ name: name }).then((property) => {
        if (property) return duplicatedResponse(res, ERROR_MSG.ITEM_EXISTS);

        const newProperty = new db.Property({
            _id: mongoose.Types.ObjectId(),
            name,
            description,
            status: status
        });

        newProperty.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

function getAll(req, res) {
    db.Property.find({ status: "Actived" })
        .exec((err, properties) => {
            if (err) {
                return errorResponse(res, err);
            }
            return successResponse(res, properties);
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

    db.Property.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, properties) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.Property.countDocuments(query).exec((count_error, count) => {
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
        return notFoundResponse(res, "The Property not found");
    }

    db.Property.findOne({ _id: req.params.id }).then(property => {
        return successResponse(res, property);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateProperty(req, res) {
    const {
        id,
        name,
        description,
        status
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const propertyUpdate = {
        name,
        status,
        description
    };

    db.Property.findOneAndUpdate({ _id: id }, propertyUpdate).then((result) => {
        return successResponse(res, "Update success");
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deleteProperty(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Property not found");
    }

    db.Property.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, "Delete success");
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    getAll,
    search,
    getById,
    createProperty,
    updateProperty,
    deleteProperty
}