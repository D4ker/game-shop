const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

module.exports = function authMiddleware (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({message: "Авторизация не удалась: заголовок пуст"});
        }

        const token = authHeader.split(" ")[1];
        if (token) {
            return res.status(403).json({message: "Авторизация не удалась: токен отсутствует"});
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "Авторизация не удалась"});
    }
}