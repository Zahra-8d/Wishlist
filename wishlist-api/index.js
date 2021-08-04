const express = require('express'),
  app = express(),
  mysql = require('mysql'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  restrictMiddleware = require("./restrict");;

// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

//routers
const listsRouter = require('./routes/lists');
const listItemsRouter = require('./routes/listItems');
const authRouter = require('./routes/auth');

// cors whitelist
const whitelist = ['https://wishlist.pastel.digital/']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// use the modules
app.use(cors(corsOptions));
app.use(bodyParser.json());

//use router
app.use('/lists', restrictMiddleware, listsRouter);
app.use('/list_items', restrictMiddleware, listItemsRouter);
app.use('/auth', restrictMiddleware, authRouter);


// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));
