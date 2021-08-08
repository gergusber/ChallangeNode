require("dotenv").config();
const { Client, APIErrorCode } = require("@notionhq/client");
const { product, order_items } = require("../models");
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const getDatabase = async () => {
  const responseResults = response.results.map((page) => {
    return {
      id: page.id,
      name: page.properties.Name.title[0]?.plain_text,
      role: page.properties.Role.rich_text[0]?.plain_text,
    };
  });

  // this console.log is just so you can see what we're getting here

  return responseResults;
};
const add_Data = async () => {
  const products = await order_items.findAll({
    attributes: ["products.id", "products.name", "orderId"],
    include: "products",
  });
  //   const db = await getDatabase();

  //   for (a in products) {
  //     await newEntryToDatabase(a.id, a.name, a.orderId);
  //   }
  //   await createPageInDatabase(process.env.DB_ID);
};

// 2. Build a `createPageInDatabase` function
async function createPageInDatabase(databaseId) {
  // The parent object to add to. Here just the ID of the database but this can also be the id of a page.
  const parent = {
    database_id: databaseId,
  };

  // Properties object. This has to match properties in the database.
  const properties = {
    Name: {
      title: [
        {
          text: {
            content: "My Awesome New Page",
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
              content: "My awesome cool page",
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
              content:
                "I created my awesome new page while following along with the KoalaTea Getting started with the Notion API JavaScript SDK blog post. Now I should go read more KoalaTea blog posts. 😄",
              link: {
                url: "https://koalatea.io/",
              },
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

  // Finally the request to create a page.
  const response = await notion.pages.create(page);
}

const newEntryToDatabase = async function (id, name, orderId) {
  // Product_id, Product_Name, Orders_num;

  const response = await notion.pages.create({
    parent: {
      database_id: process.env.DB_ID,
    },
    properties: {
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
    },
  });

  return response;
};

module.exports = {
  notion,
  add_Data,
  getDatabase,
  newEntryToDatabase,
  createPageInDatabase,
};
