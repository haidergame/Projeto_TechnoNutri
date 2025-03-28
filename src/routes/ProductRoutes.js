const express = require("express");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts); 
router.delete("/:id", ProductController.deleteProduct); 

module.exports = router;