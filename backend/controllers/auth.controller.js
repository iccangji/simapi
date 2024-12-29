const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');
const path = require('path');

exports.signup = (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(username.trim(), email.trim(), hashedPassword);
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with username ${username} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.username);
                res.cookie('authToken', token, { httpOnly: true, sameSite: 'strict' });
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        username: data.username,
                        email: data.email
                    }
                });
                return;
            }
            res.status(404).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });
}

exports.signinPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', '/login.html'));
}

exports.signupPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', '/register.html'));
}

exports.signout = (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    res.status(200).send({ message: 'Logout berhasil' });
};

