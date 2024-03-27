const ItemModel = require('../models/schema'); // Assuming you have defined the Mongoose model for items

async function getPieChartData(req, res) {
    try {
        const selectedMonth = parseInt(req.query.month); // Assuming the selected month is passed as a query parameter

        // Query the database to get unique categories and count of items in each category for the selected month
        const data = await ItemModel.aggregate([
            {
                $match: {
                    dateOfSale: { $gte: new Date(0), $lte: new Date(new Date().getFullYear(), selectedMonth, 0) } // Filter by month
                }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Return the response
        res.json(data);
    } catch (error) {
        console.error('Error fetching data for pie chart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getPieChartData };
