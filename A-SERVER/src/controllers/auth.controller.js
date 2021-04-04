import db from '../models/index.js';
import { unauthorizedResponse, successResponse, errorResponse } from '../shared/response.js'
import { ERROR_MSG } from '../constants/messages.js';
import jwt from 'jsonwebtoken';
import AUTH_CONFIG from '../config/auth.config.js';
import bcrypt from 'bcryptjs';

function login(req, res) {
    db.User.findOne({ userName: req.body.username }).then((user) => {
        if (!user) {
            return unauthorizedResponse(res, ERROR_MSG.USERNAME_OR_PASSWORD_INVALID)
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return unauthorizedResponse(res, ERROR_MSG.USERNAME_OR_PASSWORD_INVALID);
        }
        const token = jwt.sign({ username: user.userName, email: user.email }, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 })
        return successResponse(res, { success: true, token: token });
    });
}

function register(req, res) {
    db.User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return duplicatedResponse(res, ERROR_MSG.USER_EXISTS); f
        }
        const hashPassword = bcrypt.hashSync(req.body.password, AUTH_CONFIG.SALT);
        const username = req.body.email.split('@')[0];

        const token = jwt.sign({ username: username }, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 });

        const newUser = new db.User({
            _id: mongoose.Types.ObjectId(),
            userName: username,
            email: req.body.email,
            password: hashPassword
        });

        newUser.save().then((user) => {
            return successResponse(res, { token: token });
        }).catch((error) => {
            return errorResponse(res, error);
        })
    })
}

export {
    login,
    register
}