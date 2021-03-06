# ChallangeNode

- The task is based on the next database structure

We’d like you to create a project using Nodejs, Express for routing and Sequelize as ORM.

- The project has to have:

  - [x] Models migrations
  - [x] Data seeds
  - [x] REST API endpoints allowing to;
    - [x] List all Products
    - [x] Search a product by name
    - [x] List all products of a chosen order
    - [x] Create a product
    - [x] Create an order
    - [x] Add a product to an order

- [] We also need to have a scheduled function that would be executed every Monday at 7am UTC and create a simple Page in Notion using their API https://developers.notion.com/
  The created page has to have a list of all Products in the database and amount of orders they related to (i.e. simple table like this: Product_id, Product_Name, Orders_num)

- [x] Unit tests for the API endpoints

- ### Proces:

- Dev run :

  1.  npx sequelize-cli db:create
  2.  npx sequelize-cli db:migrate
  3.  npx sequelize-cli db:seed:all
  4.  npm start

- Test run: npm test
  This will generate the db, apply the migrations then the seed
