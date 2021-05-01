import mongoose from 'mongoose';

const countrySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    code: String,
    status: String
});

export default mongoose.model('Country', countrySchema);