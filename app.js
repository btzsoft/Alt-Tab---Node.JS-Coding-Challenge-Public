'use strict';

require('app-module-path').addPath(__dirname);

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('api/config');
const authMiddleware = require('api/middlewares/auth');
const errorMiddleware = require('api/middlewares/error');

const app = express();

app.use(cors({
  origin: config.server.allowOrigins,
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

//static content
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'public')));

//auth middleware
app.use(authMiddleware);

//controllers
app.use(`/api/${config.version}`, require('api/controllers'));

//error middleware
app.use(errorMiddleware);

app.listen(config.server.port, () => {
  console.log('API is ready.')
});

process.on('uncaughtException', (reason, p) => {
  console.error('Uncaught Exception at: Promise', p, 'Reason:', reason);
});

module.exports = app;
