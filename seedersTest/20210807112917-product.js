"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Product1",
          merchant_id: 1,
          price: 3,
          product_statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product2",
          merchant_id: 2,
          price: 5,
          product_statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product3",
          merchant_id: 3,
          price: 15,
          product_statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
