import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        require: true
    },
    email: String,
    password: {
        type: String,
        require: true
    },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }]
});
export default mongoose.model('User', userSchema);