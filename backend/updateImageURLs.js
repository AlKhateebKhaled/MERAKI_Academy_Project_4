const mongoose = require('mongoose');
const Product = require('./models/productSchema'); // Assuming the product model is defined here

require('dotenv').config();

// Connect to your MongoDB database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Function to generate image URL based on the product data
const generateImageURL = (product) => {
  const teamName = product.team.replace(/\s+/g, '_'); // Replace spaces with underscores
  const season = product.Season.replace(/\s+/g, '-'); // Replace spaces with hyphens
  const type = product.Type.replace(/\s+/g, '_'); // Replace spaces with underscores

  // Construct the filename
  const fileName = `${teamName}_${season}_${type}.jpg`;

  // Return the full image URL
  return `/images/${fileName}`;
};

// Update image URLs for all products
const updateImageURLs = async () => {
  try {
    const products = await Product.find({}); // Fetch all products

    for (let product of products) {
      const newImageURL = generateImageURL(product); // Generate the new URL

      // Update the product's imageURL field
      product.imageURL = newImageURL;
      await product.save(); // Save the updated product
    }

    console.log('All product image URLs updated successfully!');
  } catch (error) {
    console.log('Error updating product image URLs:', error);
  } finally {
    mongoose.connection.close(); // Close the connection after completion
  }
};

// Run the update function
updateImageURLs();
