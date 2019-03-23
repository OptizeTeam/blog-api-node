'use strict';

const express = require('express'),
	path = require('path'),

	Review = require(path.join(__dirname, '..', 'modules', 'review')),
	ReviewValidator = require(path.join(__dirname, '..', 'validators', 'review')),

	router = express.Router();

router.post('/', (req, res, next) => {
	new ReviewValidator(req, [
		'token',
		'title',
		'pros',
		'cons'
	]).validate().then(() => {
		return new Review(req.body).create();
	}).then(review => {
		res.json(review);
	}).catch(err => {
		next(err);
	});
});

router.get('/list', (req, res, next) => {
	Review.list().then(reviews => {
		res.json(reviews);
	}).catch(err => {
		next(err);
	});
});

router.get('/latest', (req, res, next) => {
	Review.list(1).then(reviews => {
		res.json(reviews);
	}).catch(err => {
		next(err);
	});
});

router.delete('/:id', (req, res, next) => {
	new ReviewValidator(req, [
		'token',
		'id'
	]).validate().then(() => {
		return new Review(req.params).delete();
	}).then(() => {
		res.status(204).end();
	}).catch(err => {
		next(err);
	});
});

router.get('/:id', (req, res, next) => {
	let validatorFields;

	if (isNaN(Number(req.params.id))) {
		req.params.slug = req.params.id;
		req.params.id = undefined;

		validatorFields = [
			'slug'
		];
	} else {
		validatorFields = [
			'id'
		];
	}

	new ReviewValidator(req, validatorFields).validate().then(() => {
		return new Review(req.params).read();
	}).then(review => {
		res.json(review);
	}).catch(err => {
		next(err);
	});
});

router.patch('/:id', (req, res, next) => {
	new ReviewValidator(req, [
		'token',
		'id',
		'title',
		'pros',
		'cons'
	]).validate().then(() => {
		return new Review({
			id: req.params.id,
			title: req.body.title,
			teaser: req.body.teaser,
			content: req.body.content,
			image: req.body.image,
			pros: req.body.pros,
			cons: req.body.cons
		}).update();
	}).then(() => {
		res.status(204).end();
	}).catch(err => {
		next(err);
	});
});

module.exports = router;
