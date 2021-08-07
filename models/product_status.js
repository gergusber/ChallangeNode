"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_status extends Model {
    static associate(models) {
      this.hasMany(models.product, {
        foreignKey: "id",
      });
    }
  }
  product_status.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "product_status",
    }
  );
  return product_status;
};
