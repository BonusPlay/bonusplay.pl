'use strict';

module.exports = function(sequelize, DataTypes) {
	var Visitor = sequelize.define('Visitor', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING(15),
			validate: {
				isIP: true
			},
			allowNull: false
		},
		count: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
	return Visitor;
};
