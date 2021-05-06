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
    const queryObject = cleanObject(req.query);

    const query = searchQuery(queryObject);
    if (queryObject.propertyId) {
        query["property"] = mongoose.Types.ObjectId(queryObject.propertyId);
    }

    delete query['propertyId'];

    const {
        pageNumber,
        pageSize
    } = queryObject;

    db.PropertyType.find(query)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .populate('property')
        .exec((err, propertyTyes) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.City.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    propertyTyes: propertyTyes
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
        id,
        name,
        description,
        propertyId,
        status
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const propertyTypeUpdate = {
        name,
        status,
        propertyId,
        description
    };

    db.PropertyType.findOneAndUpdate({ _id: id }, propertyTypeUpdate).then((result) => {
        return successResponse(res, "Update success.");
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
    search,
    getById,
    createPropertyType,
    updatePropertyType,
    deletePropertyType
}