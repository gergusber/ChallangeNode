const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("This is root!");
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
