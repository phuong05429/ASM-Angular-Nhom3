const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RoomTypePrice = sequelize.define('RoomTypePrice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  roomType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'room-type'
});

module.exports = RoomTypePrice;