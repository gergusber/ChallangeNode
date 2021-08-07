# ChallangeNode

- The task is based on the next database structure

We’d like you to create a project using Nodejs, Express for routing and Sequelize as ORM.

- The project has to have:

  - Models migrations
  - Data seeds
  - REST API endpoints allowing to;
  - List all Products
  - Search a product by name
  - List all products of a chosen order
  - Create a product
  - Create an order
  - Add a product to an order

- We also need to have a scheduled function that would be executed every Monday at 7am UTC and create a simple Page in Notion using their API https://developers.notion.com/
  The created page has to have a list of all Products in the database and amount of orders they related to (i.e. simple table like this: Product_id, Product_Name, Orders_num)

- Unit tests for the API endpoints

- Proces:

1.  For Create db run: npx sequelize-cli db:create
2.  For Run Migrations run:
