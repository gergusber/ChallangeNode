const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const productRouter = require("./routes/product");
const ordersRouter = require("./routes/order");
const cron = require("node-cron");
const notionClietn = require("./notion/client");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // ADD ALL OR WILDCARD "*" ALLOW ALL
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/product", productRouter);
app.use("/order", ordersRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

cron.schedule("0 7 0  ? * MON *", async () => {
  console.log("Task is running every minute " + new Date());
var somehting = notionClietn.createPageInDatabase();
console.log(somehting);
});

// cron.schedule("* * * * **", async () => {
//   console.log("Task is running every minute " + new Date());
//   var somehting = notionClietn.createPageInDatabase();
//   console.log(somehting);
// });
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

module.exports = {
  app,
  server,
};
