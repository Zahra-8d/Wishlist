const express = require('express'),
    router = express.Router(),
    db = require('../connection.js');

// get all list items
router.get('/list_all', function(req, res) {
    let sql = `SELECT * FROM list_items`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "All list items retrieved successfully"
      })
    })
});
  
 // get list items related to list
 router.post('/list_by_id', function(req, res) {
    let sql = `SELECT * FROM list_items WHERE list_id = `+ req.body.list_id;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "List name retrieved successfully"
      })
    })
});

// set list item to checked
router.post('/update', function(req, res) {
    let sql = `UPDATE list_items SET checked = 1, checked_by = '` + req.body.checked_by + `', checked_date= NOW() WHERE id = ` + req.body.id;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
        status: 200,
        message: "List item updated successfully"
        })
    })
});

// create new list item
router.post('/new', function(req, res) {
    let sql = `INSERT INTO list_items(list_id, name, description, url) VALUES (?)`;
    let values = [
        req.body.id,
        req.body.name,
        req.body.description,
        req.body.url,
    ];
    db.query(sql, [values], function(err, data, fields) {
        if (err) throw err;
        res.json({
        status: 200,
        message: "New list item added successfully"
        })
    })
});
  
module.exports = router;