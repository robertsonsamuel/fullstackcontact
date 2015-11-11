'use strict';

var fs = require('fs');

var Clog = {};

var db = 'db/clogs.json';

Clog.find = function(cb) {
  fs.readFile(db, function(err, data){
    if(err) return cb(err);
    var clogs = JSON.parse(data);
    cb(null, clogs);
  });
};

Clog.create = function(clog, cb) {
  Clog.find(function(err, clogs){
    clogs.push(clog);
    var data = JSON.stringify(clogs);
    fs.writeFile(db, data, cb);
  });
};

module.exports = Clog;
