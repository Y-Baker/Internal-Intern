const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("public/homePage.html", { root: __dirname });
});

app.get("/home", (req, res) => {
  res.sendFile("public/homePage.html", { root: __dirname });
});

app.get("/submit", (req, res) => {
  res.sendFile("public/submitPage.html", { root: __dirname });
});

app.get("/view", (req, res) => {
  res.sendFile("public/viewPage.html", { root: __dirname });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
