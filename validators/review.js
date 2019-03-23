'use strict';

const Ajv = require('ajv'),
	path = require('path'),

	genericValidator = require(path.join(__dirname, 'generic')),
	prosAndConsSchema = require(path.join(__dirname, 'schemas', 'review', 'prosAndCons')),

	ajv = Ajv({
		allErrors: true
	}),
	validateProsAndCons = ajv.compile(prosAndConsSchema);

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

	pros() {
		this.req.checkBody('pros', 'Zalety muszą być tablicą.').isArray();
		this.req.checkBody('pros', 'Zalety są nieprawidłowo wypełnione.').custom(value => validateProsAndCons(value));
	};

	cons() {
		this.req.checkBody('cons', 'Wady muszą być tablicą.').isArray();
		this.req.checkBody('cons', 'Wady są nieprawidłowo wypełnione.').custom(value => validateProsAndCons(value));
	};
}

module.exports = validator;
