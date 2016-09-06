/*
 *高京
 *20160226
 *404
 */
var express = require('express');
var router = express.Router();
var config = require('../handle/config.js');
var func = require('../handle/functions.js');

router.use(function(req, res, next) {
    var err = new Error('Not Found');
    func.Error(res, err);
});

module.exports = router;
