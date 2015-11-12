'use strict';

var express = require('express');
var router = express.Router();

var ContactList = require('../models/contactwrite');

router.get('/', function(req, res) {
  ContactList.find(function(err, contacts){
    if(err) return res.status(400).send(err);
    res.render('contacts', {title: 'My Clogs!', items: contacts});
  });
});

router.post('/', function(req, res) {
  var clog = req.body;
  ContactList.create(clog, function(err) {
    res.status(err ? 400 : 200).send(err || 'clog created');
  });
});

module.exports = router;
