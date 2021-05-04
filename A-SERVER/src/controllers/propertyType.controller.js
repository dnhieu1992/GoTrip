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
import { cleanObject } from '../shared/ultils.js';

function createPropertyType(req, res) {
    const {
        name,
        description,
        propertyId,
        status = "Disabled"
    } = req.body;

    if (!name || !propertyId) {
        return badRequestResponse(res, '');
    }

    db.PropertyType.findOne({ name: name }).then((propertyType) => {
        if (propertyType) return duplicatedResponse(res, ERROR_MSG.ITEM_EXISTS);

        const newPropertyType = new db.PropertyType({
            _id: mongoose.Types.ObjectId(),
            name,
            description,
            property: propertyId,
            status: status
        });

        newPropertyType.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

function search(req, res) {
    const queries = cleanObject(req.query);

    db.PropertyType.find(queries)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, propertyTypes) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.propertyType.countDocuments(queries).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    propertyTypes: propertyTypes
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Property type not found");
    }

    db.PropertyType.findOne({ _id: req.params.id }).then(propertyType => {
        return successResponse(res, propertyType);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updatePropertyType(req, res) {
    const {
        _id,
        name,
        description,
        propertyId,
        status
    } = req.body;

    if (!_id) {
        return badRequestResponse(res, '');
    }

    const propertyTypeUpdate = {
        name,
        status,
        propertyId,
        description
    };

    db.Property.findOneAndUpdate({ _id: _id }, propertyTypeUpdate).then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deletePropertyType(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Property type not found");
    }

    db.PropertyType.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    createPropertyType,
    search,
    getById,
    updatePropertyType,
    deletePropertyType
}