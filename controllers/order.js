const { order_items, products } = require("../models");
const product = require("../models/product");

exports.geOrdersById = async (req, res, next) => {
  let orderId = req.params.orderId;
  try {
    const orders = await product.findOne({ where: { id: orderId } });
    res.status(200).json({
      message: "Fetched Order_Item succesfully",
      posts: orders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await order_items.findAll();
    const totalItems = await order_items.count();
    res.status(200).json({
      message: "Fetched all Orders succesfully",
      posts: orders,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllProductsFromOrder = async (req, res, next) => {
  let orderId = req.params.orderId;
  try {
    const orderItems = await order_items.findAll({
      where: { orderId: orderId },
    });
    console.log("orders", orderItems.posts);
    if (!orderItems) {
      const error = new Error("No Order was found with this Id");
      error.statusCode = 200;
      throw error;
    }

    res.status(200).json({
      message: "Fetched posts succesfully",
      posts: orderItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Cart.getCart((cart) => {
//     Product.fetchAll((products) => {
//       const cartProducts = [];
//       for (product of products) {
//         const cartProductData = cart.products.find(
//           (prod) => prod.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "Your Cart",
//         products: cartProducts,
//       });
//     });
//   });
// };
