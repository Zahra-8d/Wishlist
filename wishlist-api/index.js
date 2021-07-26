const express = require('express'),
  app = express(),
  mysql = require('mysql'),
  cors = require('cors'),
  bodyParser = require('body-parser');

// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

//routers
const listsRouter = require('./routes/lists');
const listItemsRouter = require('./routes/listItems');
const authRouter = require('./routes/auth');

// use the modules
app.use(cors())
app.use(bodyParser.json());

//use router
app.use('//wishlistapi.pastel.digital/lists', listsRouter);
app.use('//wishlistapi.pastel.digital//list_items', listItemsRouter);
app.use('//wishlistapi.pastel.digital//auth', authRouter);


// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));
