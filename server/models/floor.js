const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Floor = sequelize.define('Floor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'floor'
});

module.exports = Floor;