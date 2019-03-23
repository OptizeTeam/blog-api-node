'use strict';

const path = require('path'),

	genericValidator = require(path.join(__dirname, 'generic'));

class validator extends genericValidator {
	email() {
		this.req.checkBody('email', 'E-mail nie może być pusty.').notEmpty();
		this.req.checkBody('email', 'E-mail jest w nieprawidłowym formacie.').isEmail();
	};
}

module.exports = validator;
