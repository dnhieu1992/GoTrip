import mongoose from 'mongoose';

const propertyLocationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: String,
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    images: [],
    description: String.apply,
    
});

export default mongoose.model('PropertyLocation', propertyLocationSchema);