const CheckIn = require('../models/checkInModel');
const Room = require('./roomController');

// Phương thức để tạo mới một check-in
exports.createCheckIn = async (req, res) => {
  try {
    const { name, price, email, roomType, phone, cccd, room,roomName,times } = req.body;
    const checkIn = await CheckIn.create({ name, price, email, roomType, phone, cccd, room,roomName,times });
    if(checkIn){
      const update = await Room.updateRoomStatus(room,"occupied")
    }
    res.status(201).json(checkIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Phương thức để lấy tất cả các check-in
exports.getAllCheckIns = async (req, res) => {
  try {
    const checkIns = await CheckIn.findAll();
    console.log(checkIns);
    res.status(200).json({
      status: "success",
      results: checkIns.length,
      data: {
        checkIns,
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Phương thức để cập nhật một check-in
exports.updateCheckIn = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, email, roomType, phone, cccd, room,times } = req.body;

    const checkIn = await CheckIn.findByPk(id);
    if (!checkIn) {
      return res.status(404).json({ message: 'Check-in not found' });
    }

    checkIn.name = name;
    checkIn.price = price;
    checkIn.email = email;
    checkIn.roomType = roomType;
    checkIn.phone = phone;
    checkIn.cccd = cccd;
    checkIn.room = room;
    checkIn.times = times;

    await checkIn.save();
    res.status(200).json(checkIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Phương thức để xóa một check-in
exports.deleteCheckIn = async (req, res) => {
  try {
    const { id } = req.params;
    const checkIn = await CheckIn.findByPk(id);
    if (!checkIn) {
      return res.status(404).json({ message: 'Check-in not found' });
    }
    await Room.updateRoomStatus(checkIn.room,"available")
    await checkIn.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
