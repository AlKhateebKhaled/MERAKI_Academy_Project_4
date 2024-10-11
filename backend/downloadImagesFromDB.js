const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/MERAKI', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Define your product schema
const productSchema = new mongoose.Schema({
  team: String,
  description: String,
  Season: String,
  Type: String,
  Brand: String,
  League: String,
  price: Number,
  stock: Number,
  categoryID: [String],
  imageURL: String
});

const Product = mongoose.model('Product', productSchema);

// Function to download images
const downloadImage = async (url, name) => {
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  });

  const writer = fs.createWriteStream(path.resolve(__dirname, 'images', name));

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

// Main function to download all images
const downloadImages = async () => {
  // Ensure the images directory exists
  if (!fs.existsSync(path.resolve(__dirname, 'images'))) {
    fs.mkdirSync(path.resolve(__dirname, 'images'));
  }

  const products = await Product.find(); // Fetch all products from the database

  for (const product of products) {
    const imageName = `${product.team.replace(/\s+/g, '_')}_${product.Season}_${product.Type}.jpg`;
    try {
      await downloadImage(product.imageURL, imageName);
      console.log(`Downloaded ${imageName}`);
    } catch (error) {
      console.error(`Failed to download image for ${product.team}:`, error);
    }
  }
};

// Run the script
const run = async () => {
  await connectDB();
  await downloadImages();
  mongoose.connection.close(); // Close the database connection
};

run();
