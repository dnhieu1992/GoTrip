import mongoose from 'mongoose';

const hotelRateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rate: { type: Number, Int16Array: true },
    hotelLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HotelLocation'
    }
});

export default mongoose.model('HotelRate', hotelRateSchema);