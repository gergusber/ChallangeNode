require("dotenv").config();
const { Client, APIErrorCode } = require("@notionhq/client");
const { product, order_items } = require("../models");
const https = require("https");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const getDatabase = async function () {
  const response = await notion.databases.list();
  console.log(response);
  // const response = await notion.databases.query({
  //   database_id: process.env.DB_ID,
  // });
  // const responseResults = response.results.map((page) => {
  //   return {
  //     id: page.id,
  //     name: page.properties.Name.title[0]?.plain_text,
  //     role: page.properties.Role.rich_text[0]?.plain_text,
  //   };
  // });

  return response;
};

const createPageInDatabase = async () => {
  var propr = [];
  order_items
    .findAll({
      attributes: ["id", "products.id", "products.name", "orderId"],
      include: "products",
    })
    .then((res) => {
      console.log(res);
      for (a in res) {
        propr.push(`Id: ${a.id}, Name:${a.name} OrderId: ${a.orderId}`);
      }
      return propr;
    })
    .then((res) => {
      // The parent object to add to. Here just the ID of the database but this can also be the id of a page.
      const parent = {
        database_id: process.env.DB_ID,
      };

      // Properties object. This has to match properties in the database.
      const properties = {
        Name: {
          title: [
            {
              text: {
                content: `Data seed from ${new Date()}`,
              },
            },
          ],
        },
      };

      // Children object that contains all the awesome Notion block objects.

      const children = [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            text: [
              {
                type: "text",
                text: {
                  content: `Data seed from ${new Date()}`,
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            text: [
              {
                type: "text",
                text: {
                  content: propr.toString(),
                },
              },
            ],
          },
        },
      ];

      // The page object where we put all our other objects together to create a new page.
      const page = {
        parent: parent,
        properties: properties,
        children: children,
      };
      return page;
    })
    .then((page) => {
      // Finally the request to create a page.
      notion.pages.create(page);
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    }); //{

  // console.log(products);
};

const newEntryToDatabase = async function (id, name, orderId) {
  // Product_id, Product_Name, Orders_num;

  const response = {
    id: {
      text: {
        content: id,
      },
    },
    name: {
      text: {
        content: name,
      },
    },
    orderId: {
      text: {
        content: orderId,
      },
    },
  };

  return response;
};

module.exports = {
  notion,
  getDatabase,
  newEntryToDatabase,
  createPageInDatabase,
};
