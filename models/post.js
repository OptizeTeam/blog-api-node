'use strict';

module.exports = (sequelize, DataTypes) => {
	const post = sequelize.define('post', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false
		},
		teaser: {
			type: DataTypes.TEXT
		},
		content: {
			type: DataTypes.TEXT
		}
	});

	return post;
};
