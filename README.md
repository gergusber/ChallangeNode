# ChallangeNode

- The task is based on the next database structure

We’d like you to create a project using Nodejs, Express for routing and Sequelize as ORM.

- The project has to have:

  - [x]Models migrations
  - [x]Data seeds
  - [x]REST API endpoints allowing to;
    - [x]List all Products
    - [x]Search a product by name
    - []List all products of a chosen order
    - []Create a product
    - []Create an order
    - []Add a product to an order

- []We also need to have a scheduled function that would be executed every Monday at 7am UTC and create a simple Page in Notion using their API https://developers.notion.com/
  The created page has to have a list of all Products in the database and amount of orders they related to (i.e. simple table like this: Product_id, Product_Name, Orders_num)

- []Unit tests for the API endpoints

- Proces:

1.  For Create db run: npx sequelize-cli db:create
2.  For Run Migrations run: npx sequelize-cli db:seed:all
