const { response } = require('express');

const express = require('express'),
    router = express.Router(),
    db = require('../connection.js'),
    getLinkPreview = require('link-preview-js').getLinkPreview;

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
      data.forEach((item, i) => {
        getLinkPreview(item['url'], {
          imagesPropertyType: "og", // fetches only open-graph images
          // headers: {
          //   "user-agent": "Firefox/64.0" // fetches with googlebot crawler user agent
          // }
        })
        .then((preview_data) => {
          console.log(preview_data)
          data[i].url_title = preview_data.title;
          data[i].url_site = preview_data.siteName;
          data[i].url_description = preview_data.description;
          data[i].url_image = preview_data.images;

          if (i == data.length - 1) {
            res.json({
              status: 200,
              data,
              message: "List items retrieved successfully"
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
      });
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
    let sql = `INSERT INTO list_items(list_id, name, price, url) VALUES (?)`;
    let values = [
        req.body.id,
        req.body.name,
        req.body.price,
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