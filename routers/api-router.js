//application router
var Post = require('../data/models/Post');

module.exports = function(app) {

	var express = require('express')

	var router = express.Router();

	router.param('name', function(req, res, next, name) {
		
		//param validation
		req.name = name;

		next();
	})

	router.get('/', function(req, res) {
		res.send('/api/posts     =>     all posts <br>/api/posts/:id     =>     post');
	})

	router.get('/posts', function(req, res) {
		Post.find({}, function(err, posts) {
			res.send(posts);
		})
	});

	router.get('/posts/:id', function(req, res) {
		Post.findById(req.params.id, function(err, post) {
			res.send(post);
		})
	});

	return router;

}