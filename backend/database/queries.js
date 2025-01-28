const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    password VARCHAR(255) NOT NULL
)
`;


const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?)
`;

const findByUsername = `
SELECT * FROM users WHERE username = ?
`;

const createTableAlat = `
CREATE TABLE IF NOT EXISTS alat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL
)
`;

const getAlat = `
SELECT * FROM alat
`;

const createNewAlat = `
INSERT INTO alat VALUES(null, ?, ?)
`;


const createTableHistory = `
CREATE TABLE IF NOT EXISTS history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    suhu DOUBLE NOT NULL,
    kelembapan DOUBLE NOT NULL,
    ppm DOUBLE NOT NULL,
    prob_suhu BOOLEAN NOT NULL,
    prob_kelembapan BOOLEAN NOT NULL,
    prob_ikan BOOLEAN NOT NULL,
    prob_ppm BOOLEAN NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
`;

const getHistory = `
SELECT * FROM history ORDER BY timestamp DESC
`;

const getHistoryByDate = `
SELECT * FROM history WHERE DATE(timestamp) = ? ORDER BY timestamp DESC
`;

const getHistoryByMonthAndWeek = `
SELECT * FROM history WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp DESC
`;

const getLatestHistory = `
SELECT * FROM history ORDER BY timestamp DESC LIMIT 1
`;


const createNewHistory = `
INSERT INTO history(suhu, kelembapan, ppm, prob_suhu, prob_kelembapan, prob_ikan, prob_ppm) VALUES(?, ?, ?, ?, ?, ?, ?)
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findByUsername,
    getAlat,
    createNewAlat,
    createTableAlat,
    createTableHistory,
    getHistory,
    createNewHistory,
    getLatestHistory,
    getHistoryByDate,
    getHistoryByMonthAndWeek
};
