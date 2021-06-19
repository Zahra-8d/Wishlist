const express = require('express'),
    router = express.Router(),
    db = require('../connection.js');

router.post('/login', function(req, res) {
    let sql = `SELECT username, access FROM users WHERE username = ? AND DECODE(password, ?) = ? LIMIT 1`;
    db.query(sql, [req.body.username, process.env.DB_KEY, req.body.password], function(err, data, fields) {
        if (err) throw err;
        let accessLevel = (data.length > 0)? data[0].access: 0;
        let username = (data.length > 0)? data[0].username: '';
        // create token
        if (accessLevel > 0 && username) {
            res.json({
                status: 200,
                message: "User login data retrieved",
                data: {
                    access: accessLevel,
                }
            })
        } else {
            return res.status(400).json({ error: "Access denied" });
        }
    })
});

module.exports = router;