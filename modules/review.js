'use strict';

const slug = require('slug'),
	status = require('http-status-codes'),
	path = require('path'),

	models = require(path.join(__dirname, '..', 'models'));

class Review {
	constructor(review) {
		this.construct(review);
	};

	construct(review) {
		this.id = review.id;
		this.title = review.title;
		this.slug = 'undefined' !== typeof this.title ? slug(this.title) : review.slug;
		this.teaser = review.teaser;
		this.content = review.content;
		this.image = review.image;
		this.pros = review.pros;
		this.cons = review.cons;
	};

	get getId() {
		return this.id;
	};

	get getTitle() {
		return this.title;
	};

	get getSlug() {
		return this.slug;
	};

	get getTeaser() {
		return this.teaser;
	};

	get getContent() {
		return this.content;
	};

	get getImage() {
		return this.image;
	};

	get getPros() {
		return this.pros;
	};

	get getCons() {
		return this.cons;
	};

	create() {
		return new Promise((resolve, reject) => {
			models.review.create({
				title: this.getTitle,
				slug: this.getSlug,
				teaser: this.getTeaser,
				content: this.getContent,
				image: this.getImage,
				pros: this.getPros,
				cons: this.getCons
			}).then((review) => {
				this.construct(review);

				return resolve({
					id: this.getId
				});
			}).catch(reject);
		});
	};

	findByPk() {
		return new Promise((resolve, reject) => {
			models.review.findByPk(this.getId).then(review => {
				if (null === review)
					return reject({
						status: status.NOT_FOUND,
						errors: [{
							message: 'Recenzja o podanym identyfikatorze nie istnieje.'
						}]
					});

				return resolve(review);
			}).catch(reject);
		});
	};

	findBySlug() {
		return new Promise((resolve, reject) => {
			models.review.findOne({
				where: {
					slug: this.getSlug
				}
			}).then(review => {
				if (null === review)
					return reject({
						status: status.NOT_FOUND,
						errors: [{
							message: 'Recenzja o podanym slugu nie istnieje.'
						}]
					});

				return resolve(review);
			}).catch(reject);
		});
	};

	read() {
		return new Promise((resolve, reject) => {
			const findMethod = 'undefined' !== typeof this.getSlug ? 'findBySlug' : 'findByPk';

			this[findMethod]().then(review => {
				this.construct(review);

				return resolve(this);
			}).catch(reject);
		});
	};

	update() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(review => review.update({
				title: this.getTitle,
				slug: this.getSlug,
				teaser: this.getTeaser,
				content: this.getContent,
				image: this.getImage,
				pros: this.getPros,
				cons: this.getCons
			})).then(() => resolve()).catch(reject);
		});
	};

	delete() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(review => {
				return review.destroy();
			}).then(() => resolve()).catch(reject);
		});
	};

	static list(limit) {
		return new Promise((resolve, reject) => {
			models.review.findAll({
				order: [['createdAt', 'desc']],
				limit: limit
			}).then(reviews => {
				const reviewsResponse = [];

				reviews.forEach(review => {
					reviewsResponse.push({
						id: review.id,
						title: review.title,
						slug: review.slug,
						teaser: review.teaser
					});
				});

				return resolve(reviewsResponse);
			}).catch(reject);
		});
	};
}

module.exports = Review;
