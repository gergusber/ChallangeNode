"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.order_items, {
      //   foreignKey: "orderId",
      // });
      // this.belongsTo(models.users, {
      //   foreignKey: "userId",
      // });
      this.belongsToMany(models.order_items, {
        as: "product",
        through: "productId",
      });
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
