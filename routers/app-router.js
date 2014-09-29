//application router

module.exports = function(app) {

	var express = require('express')

	var router = express.Router();

	router.use(function(req, res, next) {
		console.log('app router');
		console.log(req.method, req.url);
		next();
	})

	router.param('name', function(req, res, next, name) {
		
		//param validation
		req.name = name;

		next();
	})

	router.get('/', function(req, res) {
		res.send('home page');
	})

	router.get('/about', function(req, res) {
		res.send('about page');
	})

	router.get('/hello/:name', function(req, res) {
		res.send('hello ' + req.name + '!');
	})

	return router;

}