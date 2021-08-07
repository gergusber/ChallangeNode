"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_items extends Model {
    static associate(models) {
      // this.hasMany(models.product, {
      //   as: "products",
      //   foreignKey: "productId",
      // });
      // this.hasMany(models.order, {
      //   as: "orders",
      //   foreignKey: "orderId",
      // });
    }
  }
  order_items.init(
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "order_items",
    }
  );
  return order_items;
};
