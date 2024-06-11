// File: controllers/foodController.js

const Food = require('../models/food');

// Tạo món ăn mới
exports.createFood = async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả các món ăn
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin một món ăn cụ thể
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin một món ăn
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (food) {
      await food.update(req.body);
      res.status(200).json(food);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa một món ăn
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (food) {
      await food.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
