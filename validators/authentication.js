'use strict';

const path = require('path'),

	genericValidator = require(path.join(__dirname, 'generic'));

class validator extends genericValidator {
	login() {
		this.req.checkBody('login', 'Dane do logowania są nieprawidłowe.').equals('admin');
		this.req.checkBody('password', 'Dane do logowania są nieprawidłowe.').equals('qwerty123');
	};
}

module.exports = validator;
