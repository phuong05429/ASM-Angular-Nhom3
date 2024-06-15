// File: routes/roomRoutes.js

const express = require('express');
const router = express.Router();
const checkInController = require('../controllers/checkInController');

// Routes để quản lý phòng
router.post('/check-in', checkInController.createCheckIn); 
router.get('/check-in', checkInController.getAllCheckIns);
router.put('/check-in/:id', checkInController.updateCheckIn); 
router.delete('/check-in/:id', checkInController.deleteCheckIn); 
router.put("/check-in/:id/checkout", checkInController.updateCheckOutDate); 
router.get("/checked-out-rooms", checkInController.getCheckedOutRooms);
router.get("/stats/roomType", checkInController.getStatisticsByRoomType);
router.get("/stats/rentalType", checkInController.getStatisticsByRentalType);

module.exports = router;
