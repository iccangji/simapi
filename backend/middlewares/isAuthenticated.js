const { JWT_SECRET_KEY } = require('../utils/secrets');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        res.redirect('/login');
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.redirect('/login');
        }
        next();
    });
}

module.exports = {
    isAuthenticated
}