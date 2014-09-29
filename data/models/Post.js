// // The Post model
//  var mongoose = require('mongoose')
//     ,Schema = mongoose.Schema
//     ,ObjectId = Schema.ObjectId;
 
// var postSchema = new Schema({
//   title:  String,
//   body: String,
//   date: { type: Date, default: Date.now }
// });
 
// module.exports = mongoose.model('Post', postSchema);



var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var blogPostSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ author: String, email: String, body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

module.exports = mongoose.model('Post', blogPostSchema);