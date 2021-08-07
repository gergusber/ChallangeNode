const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const productRouter = require("./routes/product");

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

app.get("/", (req, res) => {
  res.send("This is root!");
});

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});