"use strict";
// const { product_status } = require("./");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      this.hasOne(models.product_status, {
        as: "product_status",
        foreignKey: "id",
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
