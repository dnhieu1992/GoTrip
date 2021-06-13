import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import AUTH_CONFIG from '../config/auth.config.js';
import { ERROR_MSG } from '../constants/messages.js';
import { unauthorizedResponse, successResponse, errorResponse, duplicatedResponse } from '../shared/response.js'

async function login(req, res) {
    try {
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

        const token = jwt.sign(currentUser, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 });

        return successResponse(res, { ...currentUser, token });
        // const tokens = [...user.tokens, token]

        // db.User.findOneAndUpdate({ _id: id }, { ...currentUser, tokens }).then(() => {
        //     return successResponse(res, { ...currentUser, token });
        // }).catch((error) => {
        //     return errorResponse(res, error);
        // })

        // db.User.findOneAndUpdate({ _id: user.id }, { ...currentUser, tokens }, {}, function (err) {
        //     if (err)
        //         return errorResponse(res, error);

        //     return successResponse(res, { ...currentUser, token });
        // });
    } catch (exp) {
        console.log(exp);
    }
}

function register(req, res) {
    const {
        username,
        email,
        password
    } = req.body;

    db.User.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })
        .then((user) => {
            if (user) {
                return duplicatedResponse(res, ERROR_MSG.USER_EXISTS); f
            }
            const hashPassword = bcrypt.hashSync(password, AUTH_CONFIG.SALT);

            const token = jwt.sign({ username: username, email: email }, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 });

            const newUser = new db.User({
                _id: mongoose.Types.ObjectId(),
                username: username,
                email: email,
                password: hashPassword,
                //tokens: [{ token }]
            });

            newUser.save()
                .then(() => successResponse(res, { username, email, token: token }))
                .catch(error => errorResponse(res, error))
        })
}

export {
    login,
    register
}