import mongoose from 'mongoose';

const propertyCategorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    description: String,
    icon: String,
    status: String
});

export default mongoose.model('PropertyCategory', propertyCategorySchema);