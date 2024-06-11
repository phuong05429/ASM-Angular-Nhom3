// File: models/food.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Food = sequelize.define('Food', {
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
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'foods',
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Food;
