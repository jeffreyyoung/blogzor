//mongo config
var mongoose = require('mongoose');

var uri = "mongodb://test:pass@proximus.modulusmongo.net:27017/haZ8isuj";

mongoose.connect(uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log('opened db connection');
});

db.on('disconnected', function() {
	mongoose.connect(uri);
})

module.exports = db;