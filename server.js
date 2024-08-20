const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./utils/database");
const user = require("./utils/config").user;
const port = require("./utils/config").port;
const getId = require("./utils/getId");
const getAllMess = require("./utils/getAllMess");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

let userId = 0;
app.use(async (req, res, next) => {
  userId = await getId(user.email);
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/submit", (req, res) => {
  res.render("submit");
});

app.get("/view", (req, res) => {
  getAllMess(user.email).then((data) => {
    res.render("view", { data }); 
  }).catch((err) => {
    console.log(err);
    res.status(404);
  });
});

app.post("/submit", async (req, res) => {
  const { title, email, message } = req.body;
  const receiverId = await getId(email);
  if (!receiverId) {
    res.json({ message: "User not found." });
    return;
  }
  const messData = { senderId: userId, receiverId, title, body: message };
  connection.query(
    "INSERT INTO messages (senderId, receiverId, title, body) VALUES \
    (?, ?, ?, ?);",
    [messData.senderId, messData.receiverId, messData.title, messData.body],
    (err) => {
      if (err) throw err;
      res.json({ message: "Message submitted." });
    }
  );
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
