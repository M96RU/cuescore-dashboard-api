const express = require("express");
const app = express();

var num = 0;

app.get("/", (req, res) => {
  num++;
  res.send("Express on Vercel: " + num);
});
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
// Export the Express API
module.exports = app;
