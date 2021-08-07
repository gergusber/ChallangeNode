const { Router } = require("express");
const router = Router();
const ordersController = require("../controllers/order");
router.get("/", ordersController.getAllOrders);

router.get("/:orderId", ordersController.geOrdersById);

router.get("/:orderId/products", ordersController.getAllProductsFromOrder);

module.exports = router;
