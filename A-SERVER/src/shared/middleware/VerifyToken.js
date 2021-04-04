import jwt from 'jsonwebtoken';
import AUTH_CONFIG from '../../config/auth.config.js';
import { ERROR_MSG } from '../../constants/messages.js';

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ successed: false, message: ERROR_MSG.AUTH_INVALID });
    jwt.verify(token, AUTH_CONFIG.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ successed: false, message: ERROR_MSG.AUTH_INVALID });
        }
        req.username = decoded.username;
        next();
    })
}
export {
    verifyToken
}