import mongoose from 'mongoose';

const propertyTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    status: String,
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        require: true
    }
});

export default mongoose.model('PropertyType', propertyTypeSchema);