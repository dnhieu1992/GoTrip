import mongoose from 'mongoose';
import User from '../models/user.model.js';
import { create } from '../shared/service.js';

export function createUser(req, res) {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        userName: req.body.userName,
        password: req.body.password,
    });

    return create(user, res);
}