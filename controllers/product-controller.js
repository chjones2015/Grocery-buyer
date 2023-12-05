const Product = require("../models/product-model");

const addProduct = async (req, res) => {
  try {
    // Get user input
    const { name, price, description, image } = req.body;

    // Validate user input
    if (!(name && price && description && image)) {
      res.status(400).send({ error: "All input is required" });
    }

    // Create new product
    const newProduct = await Product.create({
      name,
      price,
      description,
      image,
      userId: req.user.id,
    });

    // return the new product
    return res.status(201).json({
      product: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Get all products from database
    const products = await Product.find({});

    // return products
    return res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    // Get product id from url
    const { id } = req.params;

    // Find product by id
    const product = await Product.findById(id);

    // Validate if product is not found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // return product
    return res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
