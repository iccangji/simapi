const History = require('../models/history.model');
const path = require('path');

exports.index = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', '/history.html'));
}


exports.create = (suhu, kelembapan, ppm, prob_suhu, prob_kelembapan, prob_ppm) => {

    const data = new History(
        suhu,
        kelembapan,
        ppm,
        prob_suhu,
        prob_kelembapan,
        prob_ppm);
    History.create(data, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send({
                status: "success"
            });
        }
    })
}
exports.get = (req, res) => {
    const { month, week, date } = req.query;
    if (date) {
        History.getByDate(date, (err, data) => {
            if (err) {
                res.status(500).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(200).send({
                    status: "success",
                    data: data
                });
            }
        })
    }
    else if (month) {
        History.getByMonthAndWeek(month, week, (err, data) => {
            if (err) {
                res.status(500).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(200).send({
                    status: "success",
                    data: data
                });
            }
        })
    }
    else {
        History.getAll((err, data) => {
            if (err) {
                res.status(500).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(200).send({
                    status: "success",
                    data: data
                });
            }
        })
    }
}

exports.getLatest = (req, res) => {
    History.getLatest((err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                data: data
            });
        }
    })
}

