'use strict';

var express = require('express');

var router = express.Router();

router.get('*', function(req, res) {
	res.status(403).send('Use HTTPS to access API');
});

module.exports = router;