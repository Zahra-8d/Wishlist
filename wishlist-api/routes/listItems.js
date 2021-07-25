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
    const isValidURL = (string) => {
      var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      return (res !== null)
    };

    let sql = `SELECT * FROM list_items WHERE list_id = `+ req.body.list_id;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      let counter = 0;
      let item_count = data.length;
      let items = []
      data.forEach((item) => {
        if (isValidURL(item['url'])) {
          getLinkPreview(item['url'], {
            imagesPropertyType: "og", // fetches only open-graph images
            headers: {
              "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1" // fetches with googlebot crawler user agent
            }
          })
          .then((preview_data) => {
            let title = (preview_data.title == 'Access Denied' || preview_data.title =='Attention Required! | Cloudflare')? item['name']: preview_data.title;
            let list_item = {
              url_title: title,
              url_site: preview_data.siteName,
              url_description: preview_data.description,
              url_image: preview_data.images[0],
              url: item['url'],
              price: item['price'],
              name: item['name'],
              id: item['id'],
              checked_by: item['checked_by'],
              checked: item['checked']
            }
            items.push(list_item)
          })
          .then(() => {
            if (counter == item_count - 1) {
              res.json({
                status: 200,
                items,
                message: "List items retrieved successfully"
              })
            }
            counter += 1;
          })
          .catch(err => {
            console.log(err);
            if (counter == item_count - 1) {
              res.json({
                status: 200,
                items,
                message: "List items retrieved successfully"
              })
            }  
            counter += 1;
          });
        } else {
          if (counter == item_count - 1) {
            res.json({
              status: 200,
              items,
              message: "List items retrieved successfully"
            })
          }
          counter += 1;
        }
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