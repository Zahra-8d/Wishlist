const express = require('express'),
    router = express.Router(),
    db = require('../connection.js');

// get all lists
router.post('/list', function(req, res) {
    let sql = `SELECT id, name, description, UNIX_TIMESTAMP(date) as date FROM lists ORDER BY date DESC`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "All lists retrieved successfully"
      })
    })
});

 // get list name
router.post('/get_name', function(req, res) {
    let sql = `SELECT name FROM lists WHERE id = (`+ req.body.id +`)`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "List name retrieved successfully"
      })
    })
});

// create new list
router.post('/new', function(req, res) {
    let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let sql = `INSERT INTO lists(name, description, date) VALUES (?)`;
    let values = [
        req.body.name,
        req.body.description,
        currentDate
    ];
    db.query(sql, [values], function(err, data, fields) {
        if (err) throw err;
        res.json({
        status: 200,
        message: "New list added successfully"
        })
    })
});
  
module.exports = router;