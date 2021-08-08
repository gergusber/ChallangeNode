const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const { server } = require("../app");
const request = require("supertest");
const product = require("../models/product");
const ordercontroller = require("../controllers/order");

describe("Orders controller ", async (done) => {
  // before(function (done) {
  //   done();
  // });
  // after(function (done) {
  //   done();
  // });
  // beforeEach(function () {
  //   // console.log("RESET SOMEETHING EACH TEST");
  // });
  // afterEach(function () {
  //   // console.log("RESET SOMEETHING EACH TEST");
  // });

  it("GetOrders - Fetch Orders test - returns ok  ", async () => {
    const returnProduct = {
      message: "Fetched Products succesfully",
      products: {
        id: 1,
        name: "Product1",
        merchant_id: 1,
        price: 3,
        product_statusId: 1,
      },
    };
    const req = {};
    const res = {
      status: () => {
        return this;
      },
      body: function () {},
    };
    ordercontroller
      .getAllOrders(req, res, () => {})
      .then(() => {
        expect(res.status).to.be.equal(200);

        done();
      });
  });

  it("GetOrderById - Fetch order test -returns ok", async () => {
    const returnOrder = {
      message: "Fetched Orders succesfully",
      orders: { id: 1, status: "active", userId: 1 },
    };
    const { body, status } = await request(server).get("/order/1");
    expect(status).to.equal(200);
    expect(body).to.deep.include(returnOrder);
  });

  it("GetAllProductsFromOrder - Fetch products test - returns ok", async () => {
    const returnOrder = {
      message: "Fetched Products succesfully",
      products: [{ products: [Array] }, { products: [Array] }],
    };
    const { body, status } = await request(server).get("/order/1/products");
    expect(status).to.equal(200);
    // console.log("body", body);
  });
});
