const db = require('../config/db.config');
const { getAlat: getAlatQuery, createNewAlat: createNewAlatQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class Alat {
    constructor(nama, path) {
        this.nama = nama;
        this.path = path;
    }

    static getAll(cb) {
        db.query(getAlatQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static create(newAlat, cb) {
        db.query(createNewAlatQuery,
            [
                newAlat.nama,
                newAlat.path
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.id,
                    nama: newAlat.nama,
                    path: newAlat.path
                });
            });
    }
}

module.exports = Alat;