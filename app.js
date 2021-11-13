"use strict";

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/default.json');

const app = express();
app.use(cors());
app.use(express.json())
app.options('*', cors());

// All api requests
app.use(function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,multipart/form-data"
  );

  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});


// start server
let server = require("http").createServer(app);
server.listen(config.PORT, () => {
  console.log(`
      ##############################################
                    🍺 ${'PORT:::' + config.PORT} 🍺
      `);
});

/*
Database Connection
*/
mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  (db) => console.log(`
                    🍺 MONGODB CONNECTED 🍺
    ##############################################`),
  (err) => console.log("MongoDB " + String(err.message))
);

/* TEST API */
app.use('/test', async(req, res, next) => {
  res.status(200).send({
    status: 200, message: "TEST API",
    data: {}
  })
});


/* API ROUTES */
const route = require('./route');
app.use('/api', route)


/* Catch 404 Error */
app.use(async (req, res, next) => {
  res.status(404).send({
    status: 404,
    message: "Invalid Route",
    data: {}
  })
});
