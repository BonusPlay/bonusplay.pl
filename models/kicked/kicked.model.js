'use strict';

module.exports = function(sequelize, DataTypes) {
	var Kicked = sequelize.define('Kicked', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		kickedName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		kickedId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		kickerName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		count: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
	return Kicked;
};