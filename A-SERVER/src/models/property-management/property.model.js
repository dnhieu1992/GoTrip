import mongoose from 'mongoose';

const propertySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    startRating: Number,
    isUseManageChannel: Boolean,
    street: String,
    address: String,
    postCode: String,
    status: String,
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    propertyType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyType'
    }
});

export default mongoose.model('Property', propertySchema);