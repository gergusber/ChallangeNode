const { Router } = require("express");
const router = Router();
const { body } = require("express-validator");
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
module.exports = router;
