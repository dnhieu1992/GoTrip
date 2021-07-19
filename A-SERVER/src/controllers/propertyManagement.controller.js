import mongoose from 'mongoose';
import db from "../models/index.js";
import { badRequestResponse, errorResponse, successResponse } from '../shared/response.js';

async function createProperty(req, res) {
    try {
        const { propertyTypeId } = req.body;

        const property = new db.Property({
            _id: mongoose.Types.ObjectId(),
            propertyType: propertyTypeId,
            status: 'Draft'
        });

        const result = await property.save();

        return successResponse(res, result);

    } catch (exp) {
        return errorResponse(res, exp);
    }
}

async function savePropertyInfo(req, res) {
    try {
        const property = await db.Property.findOne({ _id: id });

        if (!property) {
            return badRequestResponse(res, { isSuccess: false, errorMessage: 'The property not found.' });
        }

        const msg = req.body;

        property.name = msg.name;
        property.starRating = msg.starRating;
        property.contact = msg.contact;
        property.isUseManageChannel = msg.isUseManageChannel || false;
        property.street = msg.street;
        property.address = msg.address;
        property.cityId = msg.cityId;
        property.postCode = msg.postCode;

        await property.save();
        return successResponse(res, { isSuccess: true, message: 'Data is created.' })


    } catch (exp) {
        return errorResponse(res, { isSuccess: false, errorMessage: 'Store data failed.' })
    }
}

async function addRoomToProperty(req, res) {
    try {
        const msg = req.body;

        const property = await db.Property.findOne({ _id: msg.propertyId });

        if (!property) {
            return badRequestResponse(res, { isSuccess: false, errorMessage: 'The property not found.' });
        }

        const roomType = db.RoomType.findOne({ _id: msg.roomTypeId });
        if (!roomType) {
            return badRequestResponse(res, { isSuccess: false, errorMessage: 'The room type not found.' });
        }

        const bedIds = msg.beds.map(bed => bed.id);
        const beds = await db.Bed.find({ '_id': { $in: bedIds } });
        const bedInfos = beds.map(bedInfo => {
            let amount = msg.beds.find(bed => bed.id == bedInfo._id)?.amount;
            return {
                _id: bedInfo._id,
                kind: bedInfo.kind,
                amount: amount
            }
        });

        const currentUser = {
            id: req.user._id,
            name: req.user.name
        }

        const metaData = {
            createdBy: currentUser,
            updatedBy: currentUser
        }

        const room = db.PropertyRoom({
            _id: mongoose.Schema.Types.ObjectId(),
            propertyId: mongoose.Schema.Types.ObjectId(msg.propertyId),
            roomType: {
                _id: mongoose.Schema.Types.ObjectId(msg.roomTypeId),
                type: roomType.name
            },
            customName: msg.customName,
            smokingPolicy: msg.smokingPolicy,
            numberOfBedRooms: msg.numberOfBedRooms,
            numberOfLivingRooms: msg.numberOfLivingRooms,
            numberOfBadRooms: msg.numberOfBadRooms,
            numberOfGuest: msg.numberOfGuest,
            price: msg.price,
            roomSize: msg.roomSize,
            beds: bedInfos,
            metaData: metaData,
            isDeleted: false
        });

        await room.save();
        return successResponse(res, { isSuccess: true, message: 'Data created successfuly.' })
    } catch (exp) {
        return errorResponse(res, { isSuccess: false, errorMessage: 'Data created failed.' })
    }
}

export {
    createProperty,
    savePropertyInfo,
    addRoomToProperty
}