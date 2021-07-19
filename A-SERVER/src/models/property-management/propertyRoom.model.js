import mongoose from 'mongoose';
import pkg from 'mongodb';
const { Decimal128 } = pkg;

const propertyRoomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    propertyId: mongoose.Schema.Types.ObjectId,
    roomType: {
        _id: mongoose.Schema.Types.ObjectId,
        type: String
    },
    roomName: String,
    customName: String,
    smokingPolicy: String,
    numberOfBedRooms: Number,
    numberOfLivingRooms: Number,
    numberOfBadRooms: Number,
    numberOfGuest: Number,
    price: Decimal128,
    amount: Number,
    roomSize: {
        type: String,
        size: Number,
    },
    beds: [
        {
            kind: String,
            wide: String,
            amount: Number
        }
    ],
    metaData: {
        createdBy: { _id: mongoose.Types.ObjectId, name: String },
        createdAt: { type: Date, default: Date.now },
        updatedBy: { _id: mongoose.Types.ObjectId, name: String },
        updatedAt: { type: Date, default: Date.now }
    },
    isDeleted: Boolean
});

export default mongoose.model('PropertyRoom', propertyRoomSchema);