// routes/index.js

const express = require('express');
const router = express.Router();
const DataController = require('../Controllers/DataController');
const StatisticsController = require('../Controllers/statisticsController');
const BarChartController = require('../Controllers/BarChartController');
const pieChartController = require('../Controllers/pieChartController');


// GET all users
router.get('/products', DataController.getAllProducts);

// GET statistics data for a selected month
router.get('/statistics', StatisticsController.getStatisticsData);

router.get('/barchart', BarChartController.getBarChartData);
router.get('/piechart', pieChartController.getPieChartData);



module.exports = router;
