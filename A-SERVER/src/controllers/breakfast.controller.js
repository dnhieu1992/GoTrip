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

function createBreakfast(req, res) {
    const {
        name,
        description,
        status = "Disabled"
    } = req.body;

    if (!name) {
        return badRequestResponse(res, '');
    }

    db.Breakfast.findOne({ name: name }).then((breakfast) => {
        if (breakfast) return duplicatedResponse(res, ERROR_MSG.ITEM_EXISTS);

        const newBreakfast = new db.Breakfast({
            _id: mongoose.Types.ObjectId(),
            name,
            description,
            status: status
        });

        newBreakfast.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

function getAll(req, res) {
    db.Breakfast.find({ status: "Actived" })
        .exec((err, Breakfasts) => {
            if (err) {
                return errorResponse(res, err);
            }
            return successResponse(res, Breakfasts);
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

    db.Breakfast.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, breakfasts) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.Breakfast.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    breakfasts: breakfasts
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The breakfast not found");
    }

    db.Breakfast.findOne({ _id: req.params.id }).then(breakfast => {
        return successResponse(res, breakfast);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateBreakfast(req, res) {
    const {
        id,
        name,
        description,
        status
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const breakfastUpdate = {
        name,
        status,
        description
    };

    db.Breakfast.findOneAndUpdate({ _id: id }, breakfastUpdate).then((result) => {
        return successResponse(res, "Update success");
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deleteBreakfast(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The breakfast not found");
    }

    db.Breakfast.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, "Delete success");
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    getAll,
    search,
    getById,
    createBreakfast,
    updateBreakfast,
    deleteBreakfast
}