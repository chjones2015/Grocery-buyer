const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const productController = require("../controllers/product-controller");
const verifyAuth = require("../middleware/auth");

const DIR = "./public/";

// multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//router to handle add a product
router.post(
  "/new",
  verifyAuth,
  upload.single("image"),
  productController.addProduct
);

// router to handle get all products
router.get("/all", productController.getAllProducts);

// router to handle get a product
router.get("/:id", productController.getProductById);

module.exports = router;
