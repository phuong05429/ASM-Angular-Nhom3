// File: routes/roomRoutes.js

const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Routes để quản lý phòng
router.post('/rooms', roomController.createRoom); 
router.get('/rooms', roomController.getAllRooms);
router.put('/rooms/:id', roomController.updateRoom); 
router.delete('/rooms/:id', roomController.deleteRoom); 

module.exports = router;
