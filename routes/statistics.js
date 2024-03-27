// routes/statistics.js

const express = require('express');
const router = express.Router();
const StatisticsController = require('../Controllers/statisticsController');


router.get('/statistics', StatisticsController.getStatisticsData);

module.exports = router;
