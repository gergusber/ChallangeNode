const { product, product_status } = require("../models");
const { validationResult } = require("express-validator");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await product.findAll({
      attributes: ["id", "name", "merchant_id", "price", "product_statusId"],
    });
    const totalItems = await product.count();
    res.status(200).json({
      message: "Fetched Products succesfully",
      products,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProductsByName = async (req, res, next) => {
  const prdname = req.params.name;
  try {
    const products = await product.findOne({
      attributes: ["id", "name", "merchant_id", "price", "product_statusId"],
      where: { name: prdname },
    });

    if (!products) {
      const error = new Error("No Product was found with this name");
      error.statusCode = 200;
      throw error;
    }
    res.status(200).json({
      message: "Fetched Products succesfully",
      products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation Failed, enter data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const merchant = req.body.merchant_id;
  const price = req.body.price;
  const productStatus = req.body.product_statusId;
  const status = await product_status.findOne({ where: { id: productStatus } });

  if (!status) {
    const error = new Error("validation Failed,Status is not correct");
    error.statusCode = 422;
    throw error;
  }

  try {
    const prod = new product({
      name: name,
      merchant_id: merchant,
      price: price,
      product_statusId: status.id,
    });
    const Product = await prod.save();

    res.status(201).json({
      message: "Product created successfully!",
      Product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
