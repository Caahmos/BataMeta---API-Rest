const express = require('express');
const route = express.Router();
const metacontroller = require('../src/controllers/metacontroller');

route.get('/registrar', metacontroller.registrar);

module.exports = route;