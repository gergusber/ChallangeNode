"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_items extends Model {
    static associate(models) {
      this.hasMany(models.product, {
        foreignKey: "productId",
      });
    }
  }
  order_items.init(
    {
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
