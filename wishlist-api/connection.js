const mysql = require('mysql');
require('dotenv').config();

//create connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

db.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the db');
});

module.exports = db;