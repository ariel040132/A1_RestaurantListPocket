//! 載入所需工具包
const mongoose = require("mongoose"); // 載入 mongoose
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const Restaurant = require("./models/Restaurants");

//! 資料庫設定

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 取得資料庫連線狀態
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

//! 樣板引擎設定
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
//呼叫 body-parser
app.use(express.urlencoded({ extended: true }));
//! 首頁 - finished
app.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then((restaurantData) => {
      res.render("index", { restaurantData });
    })
    .catch((err) => console.log(err));
});
//! 新增餐廳 - finished
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//! 餐廳詳情- finished
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurants) => {
      res.render("show", { restaurants });
    })
    .catch((err) => console.log(error));
});

//! 搜尋餐廳
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/");
  }
  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();

  Restaurant.find({})
    .lean()
    .then((restaurantData) => {
      const filterData = restaurantData.filter((data) => {
        // data.name & data.category 都有顯示
        return (
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
        );
      });
      res.render("index", { restaurantData: filterData, keywords });
    })
    .catch((err) => console.log(err));
});

//! 編輯餐廳 - finished
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => {
      res.render("edit", { restaurantData });
    })
    .catch((err) => console.log(err));
});
app.post("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.redirect(`/restaurants/${id}`);
    })
    .catch((err) => console.log(err));
});

//! 刪除餐廳 - finished
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndRemove(id)
    .lean()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//! start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
