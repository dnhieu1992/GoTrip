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

function createAmenity(req, res) {
    const {
        name,
        description,
        amenityCategoryId,
        status = "Disabled"
    } = req.body;

    if (!name || !amenityCategoryId) {
        return badRequestResponse(res, '');
    }

    db.Amenity.findOne({ name: name, amenityCategory_id: amenityCategoryId }).then((amenity) => {
        if (amenity) return duplicatedResponse(res, ERROR_MSG.COUNTRY_EXISTS);

        const newAmenity = new db.Amenity({
            _id: mongoose.Types.ObjectId(),
            name: name,
            description: description,
            amenityCategory: amenityCategoryId,
            status: status,
        });

        newAmenity.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })

    })
}

function search(req, res) {
    const queryObject = cleanObject(req.query);

    const query = searchQuery(queryObject);

    if (queryObject.amenityCategoryId) {
        query["amenityCategory"] = mongoose.Types.ObjectId(queryObject.amenityCategoryId);
    }

    delete query['amenityCategoryId'];

    const {
        pageNumber,
        pageSize,
        sortDirection,
        sortField = "name"
    } = queryObject;

    const sortObject = {};
    sortObject[sortField] = sortDirection === SORT_DIRECTION.ASC ? 1 : -1;

    db.Amenity.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .populate('amenityCategory')
        .exec((err, amenities) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.Amenity.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    amenities: amenities
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.Amenity.findOne({ _id: req.params.id })
        .populate('amenityCategory')
        .then(amenity => {
            return successResponse(res, amenity);
        }).catch((error) => {
            return errorResponse(res, error);
        })
}

function updateAmenity(req, res) {
    const {
        id,
        name,
        description,
        amenityCategoryId,
        status = "Disabled"
    } = req.body;

    if (!id || !amenityCategoryId) {
        return badRequestResponse(res, '');
    }

    const amenityUpdate = {
        name: name,
        description: description,
        amenityCategory: amenityCategoryId,
        status: status
    };

    db.Amenity.findOneAndUpdate({ _id: id }, { $set: amenityUpdate }, {}, function (err, amenity) {
        // now you can send the error or updated file to client
        if (err)
            return errorResponse(res, error);

        return successResponse(res, "Update success");
    });
}
function deleteAmenity(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.Amenity.findByIdAndRemove({ _id: req.params.id }).then(() => {
        return successResponse(res, "Delete success");
    }).catch(err => {
        return errorResponse(res, err);;
    });
}

export {
    search,
    getById,
    createAmenity,
    updateAmenity,
    deleteAmenity
}