const { default: start } = require('mqtt/bin/pub');
const db = require('../config/db.config');
const {
    createNewHistory: createNewHistoryQuery,
    getHistory: getHistoryQuery,
    getHistoryByDate: getHistoryByDateQuery,
    getHistoryByMonthAndWeek: getHistoryByMonthAndWeekQuery,
    getLatestHistory: getLatestHistoryQuery
} = require('../database/queries');
const { logger } = require('../utils/logger');

class History {
    constructor(suhu, kelembapan, ppm, prob_suhu, prob_kelembapan, prob_ppm) {
        this.suhu = suhu;
        this.kelembapan = kelembapan;
        this.ppm = ppm;
        this.prob_suhu = prob_suhu;
        this.prob_kelembapan = prob_kelembapan;
        this.prob_ppm = prob_ppm;
    }

    static getAll(cb) {
        db.query(getHistoryQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static getByDate(date, cb) {
        db.query(getHistoryByDateQuery, [date], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static getByMonthAndWeek(month, week, cb) {
        const year = new Date().getFullYear();
        let startDate;
        let endDate;
        switch (week) {
            case "1":
                startDate = `${year}-${month}-01`;  // Tanggal pertama bulan tersebut
                endDate = `${year}-${month}-07`;    // Tanggal terakhir minggu pertama
                break;
            case "2":
                startDate = `${year}-${month}-08`;  // Tanggal pertama minggu kedua
                endDate = `${year}-${month}-15`;    // Tanggal terakhir minggu kedua
                break;
            case "3":
                startDate = `${year}-${month}-15`;  // Tanggal pertama minggu ketiga
                endDate = `${year}-${month}-22`;    // Tanggal terakhir minggu ketiga
                break;
            case "4":
                startDate = `${year}-${month}-22`;  // Tanggal pertama minggu keempat
                endDate = `${year}-${month}-30`;    // Tanggal terakhir minggu keempat
                break;
            default:
                startDate = `${year}-${month}-1`;  // Tanggal pertama minggu keempat
                endDate = `${year}-${month}-30`;
        }

        db.query(getHistoryByMonthAndWeekQuery, [startDate, endDate], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static getLatest(cb) {
        db.query(getLatestHistoryQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static create(newData) {
        db.query(createNewHistoryQuery,
            [
                newData.suhu,
                newData.kelembapan,
                newData.ppm,
                newData.prob_suhu,
                newData.prob_kelembapan,
                newData.prob_ppm,
            ], (err) => {
                if (err) {
                    logger.error(err.message);
                    return;
                }
            });
    }
}

module.exports = History;