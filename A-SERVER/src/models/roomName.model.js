import mongoose from 'mongoose';

const roomNameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    status: String,
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType'
    }
});

export default mongoose.model('RoomName', roomNameSchema);