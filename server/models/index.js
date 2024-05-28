const sequelize = require('../config/db');
const Hotel = require('./hotelModel');

const db = {
  sequelize,
  Hotel
};

// Đồng bộ các model với cơ sở dữ liệu
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;
