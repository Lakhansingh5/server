// controllers/statisticsController.js

const User = require('../models/schema');

// Controller to handle getting statistics data for a selected month
async function getStatisticsData(req, res) {
  try {
    // Parse selected month from query string
    const selectedMonth = parseInt(req.query.month); // Assuming month is provided as a number (e.g., 1 for January)

    // Calculate statistics data
    const soldItems = await User.countDocuments({ sold: true, dateOfSale: { $gte: new Date(`2020-${selectedMonth}-01`), $lt: new Date(`2024-${selectedMonth + 1}-01`) } });
    const unsoldItems = await User.countDocuments({ sold: false });
    const totalSaleAmount = await User.aggregate([
      {
        $match: {
          sold: true,
          dateOfSale: { $gte: new Date(`2020-${selectedMonth}-01`), $lt: new Date(`2024-${selectedMonth + 1}-01`) }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }
        }
      }
    ]);

    // Prepare response data
    const statisticsData = {
      totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems: soldItems,
      totalUnsoldItems: unsoldItems
    };

    res.json(statisticsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  getStatisticsData
};
