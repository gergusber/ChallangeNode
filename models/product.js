"use strict";
// const { product_status } = require("./");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product_status, {
        foreignKey: "product_statusId",
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
