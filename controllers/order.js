const { order_items, products, order } = require("../models");
const items = require("../models/product");
const { user } = require("../models");
const { validationResult } = require("express-validator");

exports.geOrdersById = async (req, res, next) => {
  let orderId = req.params.orderId;
  try {
    const orders = await items.findOne({ where: { id: orderId } });
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
      attributes: ["products.id"],
      where: { orderId: orderId },
      include: "products",
    });

    if (!orderItems) {
      const error = new Error("No Order was found with this Id");
      error.statusCode = 200;
      throw error;
    }
    console.log(orderItems);
    res.status(200).json({
      message: "Fetched Products succesfully",
      products: orderItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation Failed, enter data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const status = req.body.status;
  const userId = req.body.userId;

  const userInsert = await user.findOne({ where: { id: userId } });

  if (!userInsert) {
    const error = new Error("validation Failed,Status is not correct");
    error.statusCode = 422;
    throw error;
  }

  try {
    const orderToAdd = new order({
      userId: userInsert.id,
      status: status,
    });
    const orderCreated = await orderToAdd.save();

    res.status(201).json({
      message: "Product created successfully!",
      order: orderCreated,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
