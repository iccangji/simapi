const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const pageRoute = require('./routes/page.route');
const { httpLogStream } = require('./utils/logger');
const cookieParser = require('cookie-parser');
const { setupMqttClient, publishMqttClient } = require('./config/mqtt.client');
const { log } = require('console');
const { stringify } = require('querystring');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());
app.use(cookieParser());
app.use('/', pageRoute);

const webPath = '../frontend'
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, webPath)));
// app.post('/order', (req, res) => {
//     const { topic, message } = req.body;
//     console.log(req.body);

//     if (!topic || !message) {
//         return res.status(400).json({ error: 'Topic dan message harus ada.' });
//     }
//     publishMqttClient('mqtt://localhost', 'order/data', stringify(message));

// });

// app.use((err, req, res, next) => {
//     res.status(err.statusCode || 500).send({
//         status: "error",
//         message: err.message
//     });
//     next();
// });

module.exports = app;