const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/hotels', hotelController.getAllHotel);
router.post('/hotel', hotelController.createHotel);
router.put('/hotel/:id', hotelController.updateHotel);
router.delete('/hotel/:id', hotelController.deleteHotel);

module.exports = router;
