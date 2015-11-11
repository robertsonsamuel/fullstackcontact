'use strict';

var express = require('express');
var router = express.Router();

var Clog = require('../models/clog');

router.get('/', function(req, res) {
  Clog.find(function(err, clogs){
    if(err) return res.status(400).send(err);
    res.render('clogs', {title: 'My Clogs!', items: clogs});
  });
});

router.post('/', function(req, res) {
  var clog = req.body;
  Clog.create(clog, function(err) {
    res.status(err ? 400 : 200).send(err || 'clog created');
    
    // if(err){
    //   res.status(400).send(err);
    // } else {
    //   res.send('clog created!');
    // }

  });
});

module.exports = router;
