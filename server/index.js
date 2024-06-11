const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hotelRoutes = require('./routes/hotelRoutes');
const settingRoutes = require('./routes/settingRoutes');
const roomRoutes = require('./routes/roomRoutes');
const checkInRoutes = require('./routes/checkInRoutes');
const foodRoutes = require('./routes/foodRoutes');


const { sequelize } = require('./models');
const cors = require('cors');
const app = express();
const port = 3000;

// Cấu hình body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cors());

// Hoặc cấu hình CORS chi tiết hơn nếu cần
app.use(cors({
  origin: '*', // Chỉ cho phép từ domain cụ thể
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Cho phép gửi cookies nếu cần
  optionsSuccessStatus: 204
}));

app.use('/api/', hotelRoutes);
app.use('/api/', settingRoutes);
app.use('/api/', roomRoutes);
app.use('/api/', checkInRoutes);
app.use('/api/', foodRoutes);

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on http://localhost:${port}`);
});
