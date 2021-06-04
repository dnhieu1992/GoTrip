import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import db from '../models/index.js';
import AUTH_CONFIG from '../config/auth.config.js';
import { ERROR_MSG } from '../constants/messages.js';
import { unauthorizedResponse, successResponse, errorResponse } from '../shared/response.js'

async function login(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        username,
        password
    } = req.body;

    const user = await db.User.findOne({ username: username });

    if (!user) {
        return unauthorizedResponse(res, ERROR_MSG.USERNAME_OR_PASSWORD_INVALID);
    }
    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
        return unauthorizedResponse(res, ERROR_MSG.USERNAME_OR_PASSWORD_INVALID);
    }

    const currentUser = {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }

    const token = jwt.sign(currentUser, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 })

    return successResponse(res, { isValid: true, token: token })
}

function register(req, res) {
    const {
        username,
        email,
        password
    } = req.body;

    db.User.findOne({ username: username }).then((user) => {
        if (user) {
            return duplicatedResponse(res, ERROR_MSG.USER_EXISTS); f
        }
        const hashPassword = bcrypt.hashSync(password, AUTH_CONFIG.SALT);

        const token = jwt.sign({ username: username, email: email }, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 });

        const newUser = new db.User({
            _id: mongoose.Types.ObjectId(),
            username: username,
            email: req.body.email,
            password: hashPassword
        });

        newUser.save()
            .then(() => successResponse(res, { token: token }))
            .catch(error => errorResponse(res, error))
    })
}

export {
    login,
    register
}