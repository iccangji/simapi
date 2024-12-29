const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findByUsername: findByUsernameQuery, createTableUSers: createIfNotExistsQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static create(newUser, cb) {
        db.query(createIfNotExistsQuery);
        db.query(createNewUserQuery,
            [
                newUser.username,
                newUser.email,
                newUser.password
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    username: newUser.username,
                    email: newUser.email
                });
            });
    }

    static findByUsername(username, cb) {
        db.query(findByUsernameQuery, username, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;