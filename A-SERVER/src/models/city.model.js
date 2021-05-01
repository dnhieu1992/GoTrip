import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    status: String,
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }
});

export default mongoose.model('City', citySchema);