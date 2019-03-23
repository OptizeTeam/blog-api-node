'use strict';

const path = require('path'),

	models = require(path.join(__dirname, 'models')),

	sequelize = models.sequelize;

sequelize.sync({
	force: true
});
