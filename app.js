// require packages used in the project
const express = require("express");
const exphbs = require("express-handlebars");
//const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const restaurantList = require("./models/Restaurant");

if (process.env.NODE_ENV !== "production") {
  // 加入這段 code, 僅在非正式環境時, 使用 dotenv
  // 要加在設定連線到mongodb之前
  require("dotenv").config();
}

//! 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

const app = express();

//! app setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(methodOverride("_method"));

//! 以上為環境設定，以下為路由器設定
app.get("/", (req, res) => {
  restaurantList
    .find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants: restaurants }))
    .catch((error) => console.log(error));
});

//show 頁面
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return restaurantList
    .findById(id)
    .lean()
    .then((restaurants) => res.render("show", { restaurants }))
    .catch((error) => console.log(error));
});

//! search function
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  res.render("index", { restaurants, keyword });
});

//! create new restaurant function
app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

app.post("/restaurants", (req, res) => {
  restaurantList
    .create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

//! start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`);
});
