import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    starNumber: { type: Number, Int16Array: true },
});

export default mongoose.model('Property', propertySchema);