import mongoose from 'mongoose';

const roomHouseKeepingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    startDate: Date,
    duration: {type: Number, min: 0, Int16Array: true},
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
});

export default mongoose.model('RoomHouseKeeping', roomHouseKeepingSchema);