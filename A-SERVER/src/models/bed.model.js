import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    kind: String,
    wide: String,
    description: String,
    status: String
});

export default mongoose.model('Bed', bedSchema);