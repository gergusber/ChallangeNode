"use strict";
// const { product_status } = require("./");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      this.belongsTo(models.product_status, {
        foreignKey: "product_statusId",
      });
      this.belongsToMany(models.order_items, {
        as: "product",
        through: "productId",
      });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      merchant_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      product_statusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
