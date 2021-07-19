import mongoose from 'mongoose';
import db from '../../models/index.js';
import { ERROR_MSG } from '../../constants/messages.js';
import {
    duplicatedResponse,
    errorResponse,
    successResponse,
    badRequestResponse,
    notFoundResponse
} from '../../shared/response.js';
import { cleanObject, searchQuery } from '../../shared/ultils.js';
import { SORT_DIRECTION } from '../../constants/constants.js';

async function create(req, res) {
    await uploadFile(req, res);

    if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
    }
    const {
        name,
        description,
        status = "Disabled"
    } = req.body;

    if (!name) {
        return badRequestResponse(res, '');
    }

    db.PropertyCategory.findOne({ name: name }).then((property) => {
        if (property) return duplicatedResponse(res, ERROR_MSG.ITEM_EXISTS);

        const newPropertyCategory = new db.PropertyCategory({
            _id: mongoose.Types.ObjectId(),
            name,
            description,
            status: status,
            icon: req.file.originalname
        });

        newPropertyCategory.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

function getAll(req, res) {
    db.PropertyCategory.find({ status: "Actived" })
        .exec((err, propertyCategories) => {
            if (err) {
                return errorResponse(res, err);
            }
            return successResponse(res, propertyCategories);
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
    var url = req.protocol + '://' + req.get('host')

    db.PropertyCategory.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, propertyCategories) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.PropertyCategory.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }

                const result = properties.map((property) => {
                    if (property.icon) {
                        return { name: property.name, description: property.description, status: property.status , imageUrl: `${url}/${property.icon}` }
                    }
                    return property;
                });

                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    propertyCategories: propertyCategories
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Property Category not found");
    }

    db.PropertyCategory.findOne({ _id: req.params.id }).then(property => {
        return successResponse(res, propertyCategory);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function update(req, res) {
    const {
        id,
        name,
        description,
        status
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const propertyCategoryUpdate = {
        name,
        status,
        description
    };

    db.PropertyCategory.findOneAndUpdate({ _id: id }, propertyCategoryUpdate).then((result) => {
        return successResponse(res, "Update success");
    }).catch((error) => {
        return errorResponse(res, error);
    })
}
function remove(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The Property not found");
    }

    db.PropertyCategory.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, "Delete success");
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    getAll,
    search,
    getById,
    create,
    update,
    remove
}