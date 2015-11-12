/* global $:false, console:false, require:false */
// moodel js

'use strict';

var fs = require('fs');

var ContactList = {};

var db = 'db/contacts.json';

ContactList.find = function(cb) {
  fs.readFile(db, function(err, data){
    if(err) return cb(err);
    var contacts = JSON.parse(data);
    cb(null, contacts);
  });
};

ContactList.create = function(person, cb) {
  ContactList.find(function(err, contacts){
    contacts.push(person);
    var data = JSON.stringify(contacts);
    fs.writeFile(db, data, cb);
  });
};


ContactList.destroy = function(index, cb){
  ContactList.find(function(err, contacts){
    if(err) return cb(err);
    contacts.splice(index.value,1);
    var data = JSON.stringify(contacts);
    fs.writeFile(db,data);
  });
};

ContactList.update = function(person,cb){
  ContactList.find(function(err,contacts){
    if (err) return cb(err);
  console.log('contacts from model',person);
   contacts.splice(parseInt(person.index),1,person);
   var data = JSON.stringify(contacts);
   fs.writeFile(db,data);
   
  });
};

module.exports = ContactList;
