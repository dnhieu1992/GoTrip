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

function createProperty(req, res) {
    const {
        name,
        description,
        status = "Disabled"
    } = req.body;

    if (!name) {
        return badRequestResponse(res, '');
    }

    db.Property.findOne({ name: name }).then((property) => {
        if (property) return duplicatedResponse(res, ERROR_MSG.ITEM_EXISTS);

        const newProperty = new db.Property({
            _id: mongoose.Types.ObjectId(),
            name,
            description,
            status: status
        });

        newProperty.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

function search(req, res) {
    const queryObject = cleanObject(req.query);
    const query = searchQuery(queryObject)
    // const defaultDatas = [
    //     {
    //         name: "Apartment",
    //         description: "Furnished and self-catering accommodation, where guests rent the entire place.",
    //         status: "Actived"
    //     },
    //     {
    //         name: "Homes",
    //         description: "Properties like apartments, holiday homes, villas, etc.",
    //         status: "Actived"
    //     },
    //     {
    //         name: "Hotel, B&Bs, and more",
    //         description: "Properties like hotels, B&Bs, guest houses, hostels, aparthotels, etc.",
    //         status: "Actived"
    //     },
    //     {
    //         name: "Alternative places",
    //         description: "Properties like boats, campsites, luxury tents, etc.",
    //         status: "Actived"
    //     }
    // ];

    // defaultDatas.forEach(item => {
    //     initData(item);
    // });

    const {
        pageNumber,
        pageSize
    } = queryObject;

    db.Property.find(query)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, properties) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.Property.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    properties: properties
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Property not found");
    }

    db.Property.findOne({ _id: req.params.id }).then(property => {
        return successResponse(res, property);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateProperty(req, res) {
    const {
        id,
        name,
        description,
        status
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const propertyUpdate = {
        name,
        status,
        description
    };

    db.Property.findOneAndUpdate({ _id: id }, propertyUpdate).then((result) => {
        return successResponse(res, "Update success");
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function deleteProperty(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Property not found");
    }

    db.Property.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, "Delete success");
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

function initData(property) {
    db.Property.findOne({ name: property.name }).then((property) => {
        if (!property) {
            const newProperty = new db.Property({
                _id: mongoose.Types.ObjectId(),
                ...property
            });

            newProperty.save().then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            })
        }
    })
}

export {
    createProperty,
    search,
    getById,
    updateProperty,
    deleteProperty
}