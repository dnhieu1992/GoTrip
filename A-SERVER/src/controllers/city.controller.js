import mongoose from 'mongoose';
import db from '../models/index.js';
import {
    duplicatedResponse,
    errorResponse,
    successResponse,
    badRequestResponse
} from '../shared/response.js';
import { ERROR_MSG } from '../constants/messages.js';

function createCity(req, res) {
    if (!req.body.name) {
        return badRequestResponse(res, '');
    }

    db.City.findOne({ name: req.body.name }).then((city) => {
        if (city) return duplicatedResponse(res, ERROR_MSG.COUNTRY_EXISTS);

        const newCity = new db.City({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            status: req.body.name || "Disabled",
        });

        newCity.save().then((result) => {
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

    db.City.find(queries).then(cities => {
        return successResponse(res, cities);
    }).catch((error) => {
        return errorResponse(res, error);
    })
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