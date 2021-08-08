const { Router } = require("express");
const router = Router();
const { body, query } = require("express-validator");
const ordersController = require("../controllers/order");

router.get("/", ordersController.getAllOrders);

router.get("/:orderId", ordersController.geOrdersById);

router.get("/:orderId/products", ordersController.getAllProductsFromOrder);

router.post(
  "/",
  [
    body("status")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a valid status"),
    body("userId").isInt().withMessage("Please enter a valid user "),
  ],
  ordersController.createOrder
);

router.put(
  "/:orderId/product",
  [
    body("productId").isInt().withMessage("Please enter a valid productId "),
    body("quantity").isInt().withMessage("Please enter a valid quantity "),
  ],
  ordersController.addProductToOrder
);
module.exports = router;
