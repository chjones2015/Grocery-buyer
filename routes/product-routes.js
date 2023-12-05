const express = require("express");
const router = express.Router();

const productController = require("../controllers/product-controller");
const verifyAuth = require("../middleware/auth");

//router to handle add a product
router.post("/new", verifyAuth, productController.addProduct);

// router to handle get all products
router.get("/all", productController.getAllProducts);

// router to handle get a product
router.get("/:id", productController.getProductById);

module.exports = router;
