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

function createBed(req, res) {
    const {
        name,
        description,
        status = "Disabled"
    } = req.body;

    if (!name) {
        return badRequestResponse(res, '');
    }

    db.Bed.findOne({ name: name }).then((bed) => {
        if (bed) return duplicatedResponse(res, ERROR_MSG.ITEM_EXISTS);

        const newBed = new db.Bed({
            _id: mongoose.Types.ObjectId(),
            name,
            description,
            status: status
        });

        newBed.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

function getAll(req, res) {
    db.Bed.find({ status: "Actived" })
        .exec((err, beds) => {
            if (err) {
                return errorResponse(res, err);
            }
            return successResponse(res, beds);
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

    db.Bed.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, beds) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.Bed.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    beds: beds
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Bed not found");
    }

    db.Bed.findOne({ _id: req.params.id }).then(bed => {
        return successResponse(res, bed);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateBed(req, res) {
    const {
        _id,
        name,
        description,
        status
    } = req.body;

    if (!_id) {
        return badRequestResponse(res, '');
    }

    const bedUpdate = {
        name,
        status,
        description
    };

    db.Bed.findOneAndUpdate({ _id: _id }, bedUpdate).then((result) => {
        return successResponse(res, "Update success");
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deleteBed(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Bed not found");
    }

    db.Bed.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, "Delete success");
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    getAll,
    search,
    getById,
    createBed,
    updateBed,
    deleteBed
}