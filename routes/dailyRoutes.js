const express = require('express');
const router = express.Router();
const dailyController = require('../controllers/dailyController');
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(dailyController.getDaily)
    .post(verifyJWT, dailyController.createDaily);

router.route('/:id')
    .get(dailyController.getDailyOne)
    .put(verifyJWT, dailyController.updateDaily)
    .delete(verifyJWT, dailyController.deleteDaily);

module.exports = router;