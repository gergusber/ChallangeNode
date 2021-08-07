const { Router } = require("express");
const router = Router();
const { body } = require("express-validator");
const productsController = require("../controllers/product");
router.get("/", productsController.getProducts);
router.get("/:name", productsController.getProductsByName);
router.post(
  "/",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a valid name"),
    body("merchant_id").isInt().withMessage("Please enter a valid merchant_id"),
    body("price").isInt().withMessage("Please enter a valid price"),
    body("product_statusId")
      .isInt()
      .withMessage("Please enter a valid product_status"),
  ],
  productsController.createProduct
);
module.exports = router;
