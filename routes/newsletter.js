'use strict';

const express = require('express'),
	path = require('path'),

	Newsletter = require(path.join(__dirname, '..', 'modules', 'newsletter')),
	NewsletterValidator = require(path.join(__dirname, '..', 'validators', 'newsletter')),

	router = express.Router();

router.post('/', (req, res, next) => {
	new NewsletterValidator(req, [
		'email'
	]).validate().then(() => {
		return new Newsletter(req.body).create();
	}).then(newsletter => {
		res.json(newsletter);
	}).catch(err => {
		next(err);
	});
});

router.get('/list', (req, res, next) => {
	new NewsletterValidator(req, [
		'token'
	]).validate().then(() => {
		return Newsletter.list();
	}).then(newsletters => {
		res.json(newsletters);
	}).catch(err => {
		next(err);
	});
});

module.exports = router;
