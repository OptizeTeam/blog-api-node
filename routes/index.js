'use strict';

const express = require('express'),
	fs = require('fs'),
	path = require('path'),

	AuthenticationValidator = require(path.join(__dirname, '..', 'validators', 'authentication')),

	router = express.Router();

router.post('/login', (req, res, next) => {
	new AuthenticationValidator(req, [
		'login'
	]).validate().then(() => {
		res.json({
			token: '42292b7e6c70628fb90809490f6bb1ae'
		});
	}).catch(err => {
		next(err);
	});
});

router.get('/logout', (req, res, next) => {
	res.status(204).end();
});

fs.readdirSync(__dirname).filter(file => file !== 'index.js').forEach(file => {
	router.use('/' + file.substr(0, file.indexOf('.')), require(path.join(__dirname, file)));
});

module.exports = router;
