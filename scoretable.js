var Db = require('../mongodb').Db;
var Connection = require('../mongodb').Connection;
var Server = require('../mongodb').Server;
var BSON = require('../mongodb').BSON;
var ObjectID = require('../mongodb').ObjectID;

ScoreTable = function(host, port) {
  this.db= new Db('node-mongo-score', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


ScoreTable.prototype.getCollection= function(callback) {
  this.db.collection('scores', function(error, scores_collection) {
    if( error ) callback(error);
    else callback(null, scores_collection);
  });
};

//find all scores
ScoreTable.prototype.findAll = function(callback) {
    this.getCollection(function(error, scores_collection) {
      if( error ) callback(error)
      else {
        scores_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new score
ScoreTable.prototype.save = function(scores, callback) {
    this.getCollection(function(error, scores_collection) {
      if( error ) callback(error)
      else {
        if( typeof(scores.length)=="undefined")
          scores = [scores];

        for( var i =0;i< scores.length;i++ ) {
          score = scores[i];
          score.created_at = new Date();
        }

        scores_collection.insert(scores, function() {
          callback(null, scores);
        });
      }
    });
};

exports.ScoreTable = ScoreTable;