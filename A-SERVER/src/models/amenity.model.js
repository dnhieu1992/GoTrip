import mongoose from 'mongoose';

const amenitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    description: String,
    status: String,
    amenityCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AmenityCategory'
    }
});

export default mongoose.model('Amenity', amenitySchema);