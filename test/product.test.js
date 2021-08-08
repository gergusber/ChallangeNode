const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const { server } = require("../app");
const request = require("supertest");
const product = require("../models/product");
const productcontroller = require("../controllers/product");

describe("product controller ", async (done) => {
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

  it("GetProducts - Fetch products test - returns ok  ", async () => {
    const returnProducts = {
      message: "Fetched Products succesfully",
      products: [
        {
          id: 1,
          name: "Product1",
          merchant_id: 1,
          price: 3,
          product_statusId: 1,
        },
        {
          id: 2,
          name: "Product2",
          merchant_id: 2,
          price: 5,
          product_statusId: 1,
        },
        {
          id: 3,
          name: "Product3",
          merchant_id: 3,
          price: 15,
          product_statusId: 1,
        },
      ],
      totalItems: 3,
    };
    const { body, status } = await request(server).get("/product");
    expect(status).to.equal(200);
    expect(body).to.deep.include(returnProducts);
  });

  it("GetProductsByName - Fetch products test -returns ok", async () => {
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
    const { body, status } = await request(server).get("/product/Product1");
    expect(status).to.equal(200);
    expect(body).to.deep.include(returnProduct);
  });

  //I DONT UNDESTAND WHY THIS ISNT WORKING
  it("CreateProduct - Create one product - returns ok", async () => {
    const returnProduct = {
      message: "Product created successfully!",
      Product: {
        name: "Manny",
        merchant_id: "Something",
        price: 3,
        product_statusId: 1,
      },
    };
    var req = {
      name: "Manny",
      merchant_id: "Something",
      price: 3,
      product_statusId: 1,
    };
    const res = {
      status: () => {
        return this;
      },
      json: function () {},
    };
    productcontroller
      .createProduct(req, res, () => {})
      .then(() => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.equal(returnProduct);

        done();
      });
  });
});
