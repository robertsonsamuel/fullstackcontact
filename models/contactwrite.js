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

ContactList.create = function(clog, cb) {
  ContactList.find(function(err, contacts){
    contacts.push(clog);
    var data = JSON.stringify(contacts);
    fs.writeFile(db, data, cb);
  });
};

module.exports = ContactList;
