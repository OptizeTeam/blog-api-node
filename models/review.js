'use strict';

module.exports = (sequelize, DataTypes) => {
	const review = sequelize.define('review', {
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
		},
		image: {
			type: DataTypes.STRING
		},
		pros: {
			type: DataTypes.JSON
		},
		cons: {
			type: DataTypes.JSON
		}
	});

	return review;
};
