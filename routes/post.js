'use strict';

const express = require('express'),
	path = require('path'),

	Post = require(path.join(__dirname, '..', 'modules', 'post')),
	PostValidator = require(path.join(__dirname, '..', 'validators', 'post')),

	router = express.Router();

router.post('/', (req, res, next) => {
	new PostValidator(req, [
		'token',
		'title'
	]).validate().then(() => {
		return new Post(req.body).create();
	}).then(post => {
		res.json(post);
	}).catch(err => {
		next(err);
	});
});

router.get('/list', (req, res, next) => {
	Post.list().then(posts => {
		res.json(posts);
	}).catch(err => {
		next(err);
	});
});

router.get('/latest', (req, res, next) => {
	Post.list(5).then(posts => {
		res.json(posts);
	}).catch(err => {
		next(err);
	});
});

router.delete('/:id', (req, res, next) => {
	new PostValidator(req, [
		'token',
		'id'
	]).validate().then(() => {
		return new Post(req.params).delete();
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
	}
	else {
		validatorFields = [
			'id'
		];
	}

	new PostValidator(req, validatorFields).validate().then(() => {
		return new Post(req.params).read();
	}).then(post => {
		res.json(post);
	}).catch(err => {
		next(err);
	});
});

router.patch('/:id', (req, res, next) => {
	new PostValidator(req, [
		'token',
		'id',
		'title'
	]).validate().then(() => {
		return new Post({
			id: req.params.id,
			title: req.body.title,
			teaser: req.body.teaser,
			content: req.body.content
		}).update();
	}).then(() => {
		res.status(204).end();
	}).catch(err => {
		next(err);
	});
});

module.exports = router;
