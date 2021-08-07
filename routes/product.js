const { Router } = require("express");
const router = Router();
const productsController = require("../controllers/product");
router.get("/", productsController.getProducts);
router.get("/:name", productsController.getProductsByName);

module.exports = router;
