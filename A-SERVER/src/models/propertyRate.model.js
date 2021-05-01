import mongoose from 'mongoose';

const propertyRateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rate: { type: Number, Int16Array: true },
    propertyLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyLocation'
    }
});

export default mongoose.model('PropertyRate', propertyRateSchema);