"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      // this.belongsToMany(models.order_items, {
      //   as: "product",
      //   through: "productId",
      // });
      this.belongsToMany(models.order_items, {
        as: "order",
        through: "orderId",
      });
    }
  }
  order.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
