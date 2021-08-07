const { Router } = require("express");
const router = Router();
const productsController = require("../controllers/product");
router.get("/:name", productsController.getProductsByName);
router.get("/", productsController.getProducts);

module.exports = router;
