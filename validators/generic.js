'use strict';

const status = require('http-status-codes');

class validator {
	constructor(req, fields) {
		this.req = req;
		this.fields = fields;
	}

	validate() {
		return new Promise((resolve, reject) => {
			this.fields.forEach(field => {
				this[field]();
			});

			const validationErrors = this.req.validationErrors();

			if (validationErrors)
				return reject({
					status: status.BAD_REQUEST,
					errors: validationErrors.map(err => {
						return {
							field: err.param,
							message: err.msg
						}
					})
				});

			resolve();
		});
	}

	token() {
		this.req.checkHeaders('token', 'Brak tokenu autoryzującego.').notEmpty();
		this.req.checkHeaders('token', 'Token autoryzujący jest nieprawidłowy.').equals('42292b7e6c70628fb90809490f6bb1ae');
	}
}

module.exports = validator;
