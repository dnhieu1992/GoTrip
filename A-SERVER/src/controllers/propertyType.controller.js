import mongoose from 'mongoose';
import db from '../models/index.js';
import {
    duplicatedResponse,
    errorResponse,
    successResponse,
    badRequestResponse
} from '../shared/response.js';
import { ERROR_MSG } from '../constants/messages.js';

function createPropertyType(req, res) {
    if (!req.body.name) {
        return badRequestResponse(res, '');
    }

    db.PropertyType.findOne({ name: req.body.name }).then((propertyType) => {
        if (propertyType) return duplicatedResponse(res, ERROR_MSG.PropertyType_EXISTS);

        const newPropertyType = new db.PropertyType({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            status: req.body.status || "Disabled",
        });

        newPropertyType.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })

    })
}

function search(req, res) {
    const queries = {};
    if (req.params.name) {
        queries['name'] = req.params.name;
    }
    if (req.params.status) {
        queries['status'] = req.params.status;
    }

    db.PropertyType.find(queries).then(propertyTypes => {
        return successResponse(res, propertyTypes);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.PropertyType.findOne({ _id: req.params.id }).then(propertyType => {
        return successResponse(res, propertyType);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updatePropertyType(req, res) {
    if (!req.body.id) {
        return badRequestResponse(res, '');
    }

    const propertyTypeUpdate = {
        name: req.body.name,
        status: req.body.status
    };

    db.PropertyType.findOneAndUpdate({ _id: id }, propertyTypeUpdate).then(() => {
        return successResponse(res);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deletePropertyType(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.PropertyType.findByIdAndRemove({ _id: req.params.id });
}

export {
    createPropertyType,
    search,
    getById,
    updatePropertyType,
    deletePropertyType
}