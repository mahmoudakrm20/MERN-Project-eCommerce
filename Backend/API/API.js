const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const LoggerServices=require('./../services/logger.services')
const User = require("../Schemas/users");
const Product = require("../Schemas/Products"); 
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
const cors = require('cors');
router.use(cors());

// Secret key for JWT token
const secretKey = process.env.KEY; 
const loggerService = new LoggerServices("api");


// Users


// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      loggerService.error("Username already in use");
      return res.status(400).json({ message: "Username already in use" });
    }

    const user = new User({
      username,
      password: password,
    });

    await user.save();
    
    loggerService.info("User signed up:", user.username);
    res.status(201).json({ user });
  } catch (error) {
    loggerService.error("Error during signup: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      loggerService.error("Username not found");
      return res.status(400).json({ message: "Username not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          username: user.username,
          role: "user",
        },
        secretKey,
        { expiresIn: "1hr" }
      );

      loggerService.info("Login successful for user:", user.username);
      res.status(200).json({ message: "Login successful", token, username: user.username });
    } else {
      loggerService.error("Invalid password for user:", user.username);
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    loggerService.error("Server error during login: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
});

//Products

// Get all products route
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    loggerService.info("Retrieved all products");
    res.status(200).json({ products });
  } catch (error) {
    loggerService.error("Failed to retrieve product data: " + error.message);
    res.status(500).json({ message: "Failed to retrieve product data" });
  }
});

// Get a product by ID route
router.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ id: productId });

    if (!product) {
      loggerService.error("Product not found for ID: " + productId);
      return res.status(404).json({ message: "Product not found" });
    }

    loggerService.info("Retrieved product by ID: " + productId);
    res.status(200).json({ product });
  } catch (error) {
    loggerService.error("Failed to retrieve the product: " + error.message);
    res.status(500).json({ message: "Failed to retrieve the product" });
  }
});

// Add a product route
router.post("/products/add", async (req, res) => {
  try {
    const { title, price, img, id } = req.body;
    const product = new Product({
      title,
      price,
      img,
      id,
    });
    await product.save();
    loggerService.info("Added a new product: " + product.title);
    res.status(201).json({ product });
  } catch (error) {
    loggerService.error("Failed to add the product: " + error.message);
    res.status(500).json({ message: "Failed to add the product" });
  }
});

// Delete a product by ID route
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id });
    if (!deletedProduct) {
      loggerService.error("Product not found for ID: " + id);
      return res.status(404).json({ message: "Product not found" });
    }
    loggerService.info("Deleted product by ID: " + id);
    res.status(200).json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    loggerService.error("Failed to delete the product: " + error.message);
    res.status(500).json({ message: "Failed to delete the product" });
  }
});



module.exports = router;