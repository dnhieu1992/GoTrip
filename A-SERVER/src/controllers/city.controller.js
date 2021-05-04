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

function createCity(req, res) {
    const {
        name,
        countryId,
        status = "Disabled"
    } = req.body;

    if (!name || !countryId) {
        return badRequestResponse(res, '');
    }

    db.City.findOne({ name: name, country_id: countryId }).then((city) => {
        if (city) return duplicatedResponse(res, ERROR_MSG.COUNTRY_EXISTS);

        const newCity = new db.City({
            _id: mongoose.Types.ObjectId(),
            name: name,
            country: countryId,
            status: status,
        });

        newCity.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })

    })
}

function search(req, res) {
    const queryObject = cleanObject(req.query);

    const query = searchQuery(queryObject);
    if (queryObject.countryId) {
        query["country"] = mongoose.Types.ObjectId(queryObject.countryId);
    }
    delete query['countryId'];
    const {
        pageNumber,
        pageSize
    } = queryObject;

    db.City.find(query)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .populate('country')
        .exec((err, cities) => {
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
                    cities: cities
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.City.findOne({ _id: req.params.id })
        .populate('country')
        .then(city => {
            return successResponse(res, city);
        }).catch((error) => {
            return errorResponse(res, error);
        })
}

function updateCity(req, res) {
    const {
        id,
        name,
        countryId,
        status = "Disabled"
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const cityUpdate = {
        name: name,
        country: countryId,
        status: status
    };

    db.City.findOneAndUpdate({ _id: id }, { $set: cityUpdate }, {}, function (err, city) {
        // now you can send the error or updated file to client
        if (err)
            return errorResponse(res, error);

        return successResponse(res, "Update success");
    });
}
function deleteCity(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.City.findByIdAndRemove({ _id: req.params.id }).then(() => {
        return successResponse(res, "Delete success");
    }).catch(err => {
        return errorResponse(res, err);;
    });
}

export {
    createCity,
    search,
    getById,
    updateCity,
    deleteCity
}