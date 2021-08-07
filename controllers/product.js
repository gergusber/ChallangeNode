const { product } = require("../models");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await product.findAll();
    const totalItems = await product.count();
    res.status(200).json({
      message: "Fetched posts succesfully",
      posts: products,
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
    const products = await product.findOne({ where: { name: prdname } });
    if (!products) {
      const error = new Error("No Product was found with this name");
      error.statusCode = 200;
      throw error;
    }
    res.status(200).json({
      message: "Fetched posts succesfully",
      posts: products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
