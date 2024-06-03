// File: controllers/roomController.js

const Room = require('../models/room');

exports.getAllRooms = async (req, res) => {
  try {
    let rooms;
    const { status,roomType } = req.query;

    if (status && status !== 'all') {
      rooms = await Room.findAll({ where: { status } });
    }else if(roomType){
      rooms = await Room.findAll({ where: { roomType } });
    }
     else {
      rooms = await Room.findAll();
    }

    res.status(200).json({
      status: "success",
      results: rooms.length,
      data: {
        rooms,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Controller để tạo mới một phòng
exports.createRoom = async (req, res) => {
  try {
    const { name, roomType, price,overnight, floor, description } = req.body;
    const room = await Room.create({ name, roomType, price,overnight, floor, description });
    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roomType, price,overnight, floor, description,status } = req.body;

    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.name = name;
    room.roomType = roomType;
    room.price = price;
    room.overnight = overnight;
    room.floor = floor;
    room.description = description;
    if(status){
      room.status = status;
    }

    await room.save();
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateRoomStatus = async (roomId, newStatus) => {
  try {
    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // Cập nhật trường status của phòng
    room.status = newStatus;
    
    // Lưu thay đổi vào cơ sở dữ liệu
    await room.save();

    return room;
  } catch (error) {
    throw new Error('Failed to update room status');
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    await room.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};