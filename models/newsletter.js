'use strict';

module.exports = (sequelize, DataTypes) => {
	const newsletter = sequelize.define('newsletter', {
		email: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return newsletter;
};
