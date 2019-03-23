'use strict';

const path = require('path'),

	models = require(path.join(__dirname, '..', 'models'));

class Newsletter {
	constructor(newsletter) {
		this.construct(newsletter);
	};

	construct(newsletter) {
		this.id = newsletter.id;
		this.email = newsletter.email;
	};

	get getId() {
		return this.id;
	};

	get getEmail() {
		return this.email;
	};

	create() {
		return new Promise((resolve, reject) => {
			models.newsletter.create({
				email: this.getEmail
			}).then((newsletter) => {
				this.construct(newsletter);

				return resolve({
					id: this.getId
				});
			}).catch(reject);
		});
	};

	static list() {
		return new Promise((resolve, reject) => {
			models.newsletter.findAll({
				order: [['createdAt', 'desc']]
			}).then(newsletters => {
				const newslettersResponse = [];

				newsletters.forEach(newsletter => {
					newslettersResponse.push({
						id: newsletter.id,
						email: newsletter.email
					});
				});

				return resolve(newslettersResponse);
			}).catch(reject);
		});
	};
}

module.exports = Newsletter;
