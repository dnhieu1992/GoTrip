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

function createAmenityCategory(req, res) {
    const {
        name,
        description,
        status = "Disabled"
    } = req.body;

    if (!name) {
        return badRequestResponse(res, '');
    }

    db.AmenityCategory.findOne({ name: name }).then((amenityCategory) => {
        if (amenityCategory) return duplicatedResponse(res, ERROR_MSG.ITEM_EXISTS);

        const newAmenityCategory = new db.AmenityCategory({
            _id: mongoose.Types.ObjectId(),
            name,
            description,
            status: status
        });

        newAmenityCategory.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

function getAll(req, res) {
    db.AmenityCategory.find({ status: "Actived" })
        .exec((err, amenityCategories) => {
            if (err) {
                return errorResponse(res, err);
            }
            return successResponse(res, amenityCategories);
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

    db.AmenityCategory.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, amenityCategories) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.AmenityCategory.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    amenityCategories: amenityCategories
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Amenity Category not found");
    }

    db.AmenityCategory.findOne({ _id: req.params.id }).then(amenityCategory => {
        return successResponse(res, amenityCategory);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateAmenityCategory(req, res) {
    const {
        id,
        name,
        description,
        status
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const amenityCategoryUpdate = {
        name,
        status,
        description
    };

    db.AmenityCategory.findOneAndUpdate({ _id: id }, amenityCategoryUpdate).then((result) => {
        return successResponse(res, "Update success");
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deleteAmenityCategory(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Amenity Category not found");
    }

    db.AmenityCategory.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, "Delete success");
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    getAll,
    search,
    getById,
    createAmenityCategory,
    updateAmenityCategory,
    deleteAmenityCategory 
}