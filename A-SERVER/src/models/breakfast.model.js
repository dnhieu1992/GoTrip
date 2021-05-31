import mongoose from 'mongoose';

const breakfastSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    status: String
});

export default mongoose.model('Breakfast', breakfastSchema);