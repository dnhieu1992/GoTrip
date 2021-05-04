import mongoose from 'mongoose';

const hotelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    description: String,
    status: String,
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }
});

export default mongoose.model('Hotel', hotelSchema);