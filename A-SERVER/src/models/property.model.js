import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    description: String,
    icon: String,
    status: String,
    PropertyCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyCategory',
        require: true
    }
});

export default mongoose.model('Property', propertySchema);