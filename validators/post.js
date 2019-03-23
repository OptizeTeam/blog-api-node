'use strict';

const path = require('path'),

	genericValidator = require(path.join(__dirname, 'generic'));

class validator extends genericValidator {
	id() {
		this.req.checkParams('id', 'Identyfikator musi być liczbą.').isInt();
	};

	slug() {
		this.req.checkParams('slug', 'Slug nie może być pusty.').notEmpty();
		this.req.checkParams('slug', 'Slug nie może mieć mniej niż 3 oraz więcej niż 255 znaków.').isLength({
			min: 3,
			max: 255
		});
	};

	title() {
		this.req.checkBody('title', 'Tytuł nie może być pusty.').notEmpty();
		this.req.checkBody('title', 'Tytuł nie może mieć mniej niż 3 oraz więcej niż 255 znaków.').isLength({
			min: 3,
			max: 255
		});
	};
}

module.exports = validator;
