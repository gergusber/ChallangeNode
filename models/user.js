"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.hasMany(models.order, {
        as: "user",
        foreignKey: "id",
      });
    }
  }
  user.init(
    {
      full_name: DataTypes.STRING,
      country_code: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
