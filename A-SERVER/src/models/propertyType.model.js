import mongoose from 'mongoose';

const propertyTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    status: String
});

export default mongoose.model('PropertyType', propertyTypeSchema);