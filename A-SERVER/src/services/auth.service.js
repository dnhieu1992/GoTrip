import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import AUTH_CONFIG from '../config/auth.config.js';

async function login(username, password) {
    try {
        const user = await db.User.findOne({ userName: username });
        if (!user) {
            return { isValid: "false", errorMessage: ERROR_MSG.USERNAME_OR_PASSWORD_INVALID };
        }
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return { isValid: true, token: token }
        }
        const token = jwt.sign({ username: user.userName, email: user.email }, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 })
        return { isValid: true, token: token }
    } catch (err) {
        //return res.status(500).send();
    }
}
export default {
    login
}