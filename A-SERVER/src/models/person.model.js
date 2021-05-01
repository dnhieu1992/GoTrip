import mongoose from 'mongoose';

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: String,
    phone: String,
    accountType: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Person', personSchema);