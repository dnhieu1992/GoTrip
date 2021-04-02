import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    name: { type: String, require: true }
});

export default mongoose.model('Role', roleSchema);