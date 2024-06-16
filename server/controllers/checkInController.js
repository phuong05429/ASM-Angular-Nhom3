const CheckIn = require('../models/checkInModel');
const Room = require('./roomController');
const { Op,fn, col } = require('sequelize');

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

exports.updateCheckOutDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkOutDate } = req.body;

    const checkIn = await CheckIn.findByPk(id);
    if (!checkIn) {
      return res.status(404).json({ message: 'Check-in not found' });
    }

    checkIn.checkOutDate = checkOutDate;
    await checkIn.save();

    await Room.updateRoomStatus(checkIn.room, "available");

    res.status(200).json(checkIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Phương thức để lấy tất cả các phòng đã trả
exports.getCheckedOutRooms = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;  // Lấy trang hiện tại, mặc định là trang 1
    const limit = parseInt(req.query.limit, 10) || 10;  // Lấy số bản ghi mỗi trang, mặc định là 10
    const offset = (page - 1) * limit;  // Tính toán offset

    const { count, rows: checkedOutRooms } = await CheckIn.findAndCountAll({
      where: {
        checkOutDate: {
          [Op.ne]: null
        }
      },
      limit,
      offset
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: checkedOutRooms
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Biểu đồ loại phòng
exports.getStatisticsByRoomType = async (req, res) => {
  try {
    const roomTypeStats = await CheckIn.findAll({
      attributes: [
        'roomType',
        [fn('COUNT', col('id')), 'totalRooms'],
      ],
      where: {
        checkOutDate: {
          [Op.ne]: null
        }
      },
      group: ['roomType']
    });

    res.status(200).json(roomTypeStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Biểu đồ thuê theo giờ theo đêm
exports.getStatisticsByRentalType = async (req, res) => {
  try {
    const rentalTypeStats = await CheckIn.findAll({
      attributes: [
        'times',
        [fn('COUNT', col('id')), 'totalRooms'],
      ],
      where: {
        checkOutDate: {
          [Op.ne]: null
        }
      },
      group: ['times']
    });

    res.status(200).json(rentalTypeStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
