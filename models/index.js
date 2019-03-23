'use strict';

const fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize'),

	/**
	 * @type {Object}
	 *   @property {String} database
	 *   @property {String} username
	 *   @property {String} password
	 */
	config = require(path.join(__dirname, '..', 'config', 'database.json')),

	sequelize = new Sequelize(config.database, config.username, config.password, config),

	db = {};

fs.readdirSync(__dirname).filter(file => file !== 'index.js').forEach(file => {
	const model = sequelize.import(path.join(__dirname, file));

	db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
