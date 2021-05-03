import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    status: String,
    bookingPrice: { type: Number, Float64Array: true },
    isSmoking: Boolean,
    propertyLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'propertyLocation'
    }
});

export default mongoose.model('Room', roomSchema);