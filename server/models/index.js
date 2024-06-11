const sequelize = require('../config/db');
const Floor = require('./floor');
const Hotel = require('./hotelModel');
const RoomTypePrice = require('./rooms');

const db = {
  sequelize,
  Hotel,
  RoomTypePrice,
  Floor
};

// Đồng bộ các model với cơ sở dữ liệu
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;
