import mongoose from 'mongoose';
import db from '../models/index.js';
import {
    duplicatedResponse,
    errorResponse,
    successResponse,
    badRequestResponse
} from '../shared/response.js';
import { ERROR_MSG } from '../constants/messages.js';
import { cleanObject } from '../shared/ultils.js';

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
    const queries = cleanObject(req.query);

    db.City.find(queries)
        .populate('country')
        .exec(function (err, cities) {
            if (err) return errorResponse(res, err);
            return successResponse(res, cities);
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.City.findOne({ _id: req.params.id }).then(city => {
        return successResponse(res, city);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateCity(req, res) {
    if (!req.body.id) {
        return badRequestResponse(res, '');
    }

    const cityUpdate = {
        name: req.body.name,
        status: req.body.status
    };

    db.City.findOneAndUpdate({ _id: req.body.id }, cityUpdate).then(() => {
        return successResponse(res);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deleteCity(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    db.City.findByIdAndRemove({ _id: req.params.id });
}

export {
    createCity,
    search,
    getById,
    updateCity,
    deleteCity
}