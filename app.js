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
const server = require("http").Server(app);

// cron.schedule("* * * * *", async () => {
//   console.log("Task is running every minute " + new Date());
//   // Initializing a client
//   notionClietn.add_Data();
// });

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

module.exports = {
  app,
  server,
};
