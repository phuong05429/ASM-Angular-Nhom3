const Floor = require('../models/floor');
const RoomTypePrice = require('../models/rooms');

// Get all room types with prices
exports.getRoomTypesWithPrices = async (req, res) => {
  try {
    const roomTypes = await RoomTypePrice.findAll();
    res.status(200).json(roomTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new room type with price
exports.createRoomTypeWithPrice = async (req, res) => {
  try {
    const { roomType, price } = req.body;
    const newRoomTypePrice = await RoomTypePrice.create({ roomType, price });
    res.status(201).json(newRoomTypePrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a room type with price
exports.updateRoomTypeWithPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomType, price } = req.body;
    const roomTypePrice = await RoomTypePrice.findByPk(id);
    if (roomTypePrice) {
      roomTypePrice.roomType = roomType;
      roomTypePrice.price = price;
      await roomTypePrice.save();
      res.status(200).json(roomTypePrice);
    } else {
      res.status(404).json({ error: 'Room type not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a room type with price
exports.deleteRoomTypeWithPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const roomTypePrice = await RoomTypePrice.findByPk(id);
    if (roomTypePrice) {
      await roomTypePrice.destroy();
      res.status(200).json({ message: 'Room type deleted' });
    } else {
      res.status(404).json({ error: 'Room type not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all floors
exports.getAllFloors = async (req, res) => {
  try {
    const floors = await Floor.findAll();
    res.status(200).json(floors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new floor
exports.createFloor = async (req, res) => {
  try {
    const { floor } = req.body;
    const newFloor = await Floor.create({ floor });
    res.status(201).json(newFloor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a floor
exports.deleteFloor = async (req, res) => {
  try {
    const { id } = req.params;
    const floor = await Floor.findByPk(id);
    if (floor) {
      await floor.destroy();
      res.status(200).json({ message: 'Floor deleted' });
    } else {
      res.status(404).json({ error: 'Floor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
