const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CheckIn = sequelize.define('CheckIn', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cccd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false
  },
  times: {
    type: DataTypes.STRING,
    allowNull: false
  },
  checkInDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  checkOutDate: {  // Thêm trường checkOutDate
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'checkins'
});

module.exports = CheckIn;
