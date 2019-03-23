'use strict';

const slug = require('slug'),
	status = require('http-status-codes'),
	path = require('path'),

	models = require(path.join(__dirname, '..', 'models'));

class Post {
	constructor(post) {
		this.construct(post);
	};

	construct(post) {
		this.id = post.id;
		this.title = post.title;
		this.slug = 'undefined' !== typeof this.title ? slug(this.title) : post.slug;
		this.teaser = post.teaser;
		this.content = post.content;
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

	create() {
		return new Promise((resolve, reject) => {
			models.post.create({
				title: this.getTitle,
				slug: this.getSlug,
				teaser: this.getTeaser,
				content: this.getContent
			}).then((post) => {
				this.construct(post);

				return resolve({
					id: this.getId
				});
			}).catch(reject);
		});
	};

	findByPk() {
		return new Promise((resolve, reject) => {
			models.post.findByPk(this.getId).then(post => {
				if (null === post)
					return reject({
						status: status.NOT_FOUND,
						errors: [{
							message: 'Post o podanym identyfikatorze nie istnieje.'
						}]
					});

				return resolve(post);
			}).catch(reject);
		});
	};

	findBySlug() {
		return new Promise((resolve, reject) => {
			models.post.findOne({
				where: {
					slug: this.getSlug
				}
			}).then(post => {
				if (null === post)
					return reject({
						status: status.NOT_FOUND,
						errors: [{
							message: 'Post o podanym slugu nie istnieje.'
						}]
					});

				return resolve(post);
			}).catch(reject);
		});
	};

	read() {
		return new Promise((resolve, reject) => {
			const findMethod = 'undefined' !== typeof this.getSlug ? 'findBySlug' : 'findByPk';

			this[findMethod]().then(post => {
				this.construct(post);

				return resolve(this);
			}).catch(reject);
		});
	};

	update() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(post => post.update({
				title: this.getTitle,
				slug: this.getSlug,
				teaser: this.getTeaser,
				content: this.getContent
			})).then(() => resolve()).catch(reject);
		});
	};

	delete() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(post => {
				return post.destroy();
			}).then(() => resolve()).catch(reject);
		});
	};

	static list(limit) {
		return new Promise((resolve, reject) => {
			models.post.findAll({
				order: [['createdAt', 'desc']],
				limit: limit
			}).then(posts => {
				const postsResponse = [];

				posts.forEach(post => {
					postsResponse.push({
						id: post.id,
						title: post.title,
						slug: post.slug,
						teaser: post.teaser
					});
				});

				return resolve(postsResponse);
			}).catch(reject);
		});
	};
}

module.exports = Post;
