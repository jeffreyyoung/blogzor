//admin router

var Post = require('../data/models/Post');

module.exports = function(app) {

	var express = require('express')

	var router = express.Router();

	router.post('/login', function(req, res) {
		if (req.body.password == "pass" && req.body.username == "user"){

			req.session.username = req.body.username;
			req.session.password = req.body.password;

		}

		res.redirect('/admin');
	})

	router.use(function(req, res, next) {
		//if (req.session.password && req.session.username) {
		if(true) {
			next();
		}
		else {
			res.render('admin/login', {})
		}
	})

	router.param('name', function(req, res, next, name) {
		console.log('doing name validations on ' + name);

		req.name = name;

		next();
	})

	router.get('/logout', function(req, res) {
		req.session.destroy(function(err){
			if (err) console.log('oh shiz cant destroy session')
		});
		res.redirect('/admin');
	})

	router.route('/new-post')
		.post(function(req, res){
			var newPost = Post({
				title: req.body.title,
				author: req.body.author,
				body:req.body.body
			})

			newPost.save();

			res.redirect('/admin');
		})
		.get (function(req, res) {
			res.render('partials/post-form', {
				title: 'Post Form',
				layout: 'admin-layout'
			});
		})
	

	router.get('/posts', function(req,res) {
		Post.find({}, function(err, posts) {
			res.render('admin/posts', {
				title: 'Posts',
				posts: posts,
				layout: 'admin-layout'
			});
		})
	})

	router.route('/posts/:id')
		.post(function(req, res) {

			var p = new Object();
			p.title = req.body.title;
			p.post = req.body.post;
			p.author = req.body.author;
			p.date = req.body.date;

			console.log(p);
			Post.findByIdAndUpdate(req.params.id, p, function(err, post) {
				res.redirect('/admin/posts');
			} )
		})
		.get(function(req, res) {
			Post.findById(req.params.id, function(err, post) {
				res.render('admin/post', {
					title: 'View/Edit Post',
					post: post,
					layout: 'admin-layout'
				})
			})
		})

	router.get('/posts/:id', function(req, res) {
		Post.findById(req.params.id, function(err, post) {
			res.render('admin/post', {
				title: 'View/Edit Post',
				post: post,
				layout: 'admin-layout'
			})
		})
	})

	router.get('/posts/:id/delete', function(req, res) {
		Post.findByIdAndRemove(req.params.id, function(err, post) {
			res.redirect('/admin')
		})
	})

	router.get('/', function(req, res) {
		res.redirect('/admin/posts')
	})

	router.get('/about', function(req, res) {
		res.send('about page');
	})

	router.get('/hello/:name', function(req, res) {
		res.send('hello ' + req.name + '!');
	})

	return router;

}