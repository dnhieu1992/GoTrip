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
import { searchQuery, cleanObject } from '../shared/ultils.js';

function createCountry(req, res) {
    const {
        code,
        name,
        status = "Disabled"
    } = req.body;
    if (!code || !name) {
        return badRequestResponse(res, '');
    }

    db.Country.findOne({ name: name }).then((country) => {
        if (country) return duplicatedResponse(res, ERROR_MSG.COUNTRY_EXISTS);

        const newCountry = new db.Country({
            _id: mongoose.Types.ObjectId(),
            code,
            name,
            status: status
        });

        newCountry.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })

    })
}

function getAll(req, res) {
    db.Country.find({ status: "Actived" })
        .exec((err, countries) => {
            if (err) {
                return errorResponse(res, err);
            }
            return successResponse(res, countries);
        });
}

function search(req, res) {
    const queryObject = cleanObject(req.query);

    const query = searchQuery(queryObject);

    const {
        pageNumber,
        pageSize,
        sortDirection,
        sortField = "name"
    } = queryObject;

    const sortObject = {};
    sortObject[sortField] = sortDirection === 'asc' ? 1 : -1;

    db.Country.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, countries) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.Country.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    countries: countries
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The country not found");
    }
    db.Country.findOne({ _id: req.params.id }).then(country => {
        return successResponse(res, country);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateCountry(req, res) {
    const {
        _id,
        code,
        name,
        status
    } = req.body;

    if (!_id) {
        return badRequestResponse(res, '');
    }

    const countryUpdate = { code, name, status };

    db.Country.findOneAndUpdate({ _id: _id }, countryUpdate).then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function deleteCountry(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The country not found");
    }

    db.Country.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    getAll,
    search,
    getById,
    createCountry,
    updateCountry,
    deleteCountry,

}