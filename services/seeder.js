// services/dataSeeder.js

const axios = require('axios');
const Product = require('../models/schema');

// Function to fetch data from the third-party API and seed into the database
async function seedData() {
  try {
    // Example URL for fetching data from a third-party API
    const apiUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

    // Fetch data from the API
    const response = await axios.get(apiUrl);
    const productsData = response.data;
    // console.log("data ---"  , productsData)
    // Seed data into the database
    await Product.insertMany(productsData);

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

module.exports = seedData;
