const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Routes để quản lý món ăn
router.post('/food', foodController.createFood); 
router.get('/food', foodController.getAllFoods);
router.get('/food/:id', foodController.getFoodById);
router.put('/food/:id', foodController.updateFood); 
router.delete('/food/:id', foodController.deleteFood); 

module.exports = router;
