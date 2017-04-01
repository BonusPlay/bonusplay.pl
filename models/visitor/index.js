'use strict';

var express = require('express');
var controller = require('./visitor.controller');

var router = express.Router();

router.put('/:address', controller.put);

module.exports = router;
