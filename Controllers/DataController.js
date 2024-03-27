const Products = require('../models/schema');

async function getAllProducts(req, res, month) {
  try {
    let query = {};

    // Search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i'); // Case-insensitive search
      query.$or = [
        { title: searchRegex },
        { description: searchRegex }
      ];
    }

    if (req.query.month) {
      try {
        const selectedMonth = parseInt(req.query.month);
        if (isNaN(selectedMonth)) {
          throw new Error('Invalid month format. Month must be a number.');
        }

        const dateMatcher = new Date(2020, selectedMonth - 1); // Year set to 0001

        query.dateOfSale = {
          $gte: dateMatcher, 
          $lt: new Date(2024, selectedMonth, 0) 
        };
      } catch (error) {
        console.error('Error parsing month:', error.message);
        return res.status(400).json({ message: 'Invalid month query.' });
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = Math.max(0, (page - 1) * limit); // Ensure skip is non-negative

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ message: 'Invalid page or limit query.' });
    }

    
    console.log('--- Query:', JSON.stringify(query, null, 2));
    console.log('--- Pagination:', `page=${page}, limit=${limit}, skip=${skip}`);

    
    const products = await Products.find(query)
      .skip(skip)
      .limit(limit);

    if (!products) {
      return res.status(404).json({ message: 'No products found.' });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {getAllProducts};
