"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "order_items",
      [
        //Order 1
        {
          orderId: 1,
          productId: 1,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          orderId: 1,
          productId: 2,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        //Order2
        {
          orderId: 2,
          productId: 2,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          orderId: 2,
          productId: 3,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("order_items", null, {});
  },
};
