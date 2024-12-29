const path = require('path');
const Alat = require('../models/alat.model');

exports.index = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', '/alat.html'));
}
exports.insert = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', '/tambah-alat.html'));
}
exports.create = (req, res) => {
    const { nama } = req.body;
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const fileName = req.file.filename;
    console.log(fileName);

    const alat = new Alat(nama, fileName);
    Alat.create(alat, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    })
}
exports.get = (req, res) => {
    Alat.getAll((err, data) => {
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
