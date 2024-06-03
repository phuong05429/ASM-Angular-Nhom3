const express = require('express');
const router = express.Router();
const SettingController = require('../controllers/settingController');

router.get('/roomTypePrice', SettingController.getRoomTypesWithPrices);
router.post('/roomTypePrice', SettingController.createRoomTypeWithPrice);
router.put('/roomTypePrice/:id', SettingController.updateRoomTypeWithPrice);
router.delete('/roomTypePrice/:id', SettingController.deleteRoomTypeWithPrice);

router.get('/floor', SettingController.getAllFloors);
router.post('/floor', SettingController.createFloor);
router.delete('/floor/:id', SettingController.deleteFloor);

module.exports = router;
