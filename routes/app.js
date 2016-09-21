var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/user');
var Message = require('../models/message');
var ServerData = require('../models/serverdata');

router.get('/', function(req, res, next){
	 res.render('index');
});

router.post('/', function(req, res, next){

});

router.get('/chat', function(req, res, next){
	Message.find()
		.exec(function(err, docs) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: docs
			});
		});
});

router.post('/chat', function(req, res, next) {
	var message = new Message({
		content: req.body.content
	});
	message.save(function(err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(201).json({
			message: 'Saved message',
			obj: result
		});
	});
});

router.patch('/chat/:id', function(req, res, next) {
	Message.findById(req.params.id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!doc) {
			return res.status(404).json({
				title: 'No message found',
				error: {message: 'Message could not be found'}
			});
		}
		doc.content = req.body.content;
		doc.save(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: result
			});
		});
	});
});

router.delete('/chat/:id', function(req, res, next) {
	Message.findById(req.params.id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!doc) {
			return res.status(404).json({
				title: 'No message found',
				error: {message: 'Message could not be found'}
			});
		}
		doc.remove(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: result
			});
		});
	});
});


module.exports = router;
