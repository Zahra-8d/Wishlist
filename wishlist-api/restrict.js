const express = require('express'),
    db = require('./connection.js');

module.exports = function (req, res, next) {
    req.requestTime = Date.now()
    let sql = `SELECT access FROM users WHERE username = ? LIMIT 1`;
    db.query(sql, [req.body.username], function(err, data, fields) {
        if (err) next(err);
        let accessLevel = (data.length > 0)? data[0].access: 0;
        if (accessLevel > 0) {
            next()
        } else {
            const err = new Error("Not authorized! Go back!");
            next(err)
        }
    })
};