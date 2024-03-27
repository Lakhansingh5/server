const ItemModel = require('../models/schema'); // Assuming you have defined the Mongoose model for items

async function getBarChartData(req, res) {
    try {
        const selectedMonth = parseInt(req.query.month); // Assuming the selected month is passed as a query parameter

        // Define price ranges
        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity } // "Infinity" represents prices above 900
        ];

        // Query the database to get count of items falling into different price ranges for the selected month
        const data = await Promise.all(priceRanges.map(async range => {
            const count = await ItemModel.countDocuments({
                price: { $gte: range.min, $lte: range.max },
                dateOfSale: { $gte: new Date(0), $lte: new Date(new Date().getFullYear(), selectedMonth, 0) } // Filter by month
            });
            return { range: `${range.min}-${range.max}`, count };
        }));

        // Return the response
        res.json(data);
    } catch (error) {
        console.error('Error fetching data for bar chart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getBarChartData };
