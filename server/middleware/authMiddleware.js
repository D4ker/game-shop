const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

module.exports = function authMiddleware (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).json({message: "Авторизация не удалась"});
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "Авторизация не удалась"});
    }
}