/*global $:false, console:false */
// contact router
'use strict';

var express = require('express');
var router = express.Router();

var ContactList = require('../models/contactwrite');

router.get('/', function(req, res) {
  ContactList.find(function(err, contacts){
    if(err) return res.status(400).send(err);
    res.render('contacts', {title: 'Contacts', people: contacts});
  });
});


router.post('/', function(req, res) {
  var contact = req.body;
  ContactList.create(contact, function(err) {
    res.status(err ? 400 : 200).send(err || 'contact created');
  });
});


router.delete('/delete', function(req,res){
  var index = req.body;
  ContactList.destroy(index, function(err){
    res.status(err ? 400 : 200).send(err || 'contact removed');
  });
});


router.post('/update', function(req,res){
  var index = req.body;
  ContactList.update(index, function(err){
    res.status(err ? 400 : 200).send(err || 'contact updated');
  });
});

module.exports = router;
