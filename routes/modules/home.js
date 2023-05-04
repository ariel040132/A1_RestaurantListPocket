const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurants");

//! 首頁 - finished
router.get("/", (req, res) => {
  const sortType = req.query.sort;
  const userId = req.user._id;
  let sortOption = {};

  switch (sortType) {
    case "asc":
      sortOption = { name: "asc" };
      break;
    case "desc":
      sortOption = { name: "desc" };
      break;
    case "category":
      sortOption = { category: "asc" };
      break;
    case "location":
      sortOption = { location: "asc" };
      break;
    case "rating":
      sortOption = { rating: "desc" };
      break;
    default:
      sortOption = { _id: "asc" };
      break;
  }

  Restaurant.find({ userId })
    .lean()
    .sort(sortOption)
    .then((restaurantData) => {
      res.render("index", { restaurantData });
    })
    .catch((err) => console.log(err));
});
//! 搜尋餐廳
router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/");
  }

  const keywords = req.query.keywords;

  Restaurant.find({
    $or: [
      { name: { $regex: keywords, $options: "i" } },
      { category: { $regex: keywords, $options: "i" } },
    ],
  })
    .lean()
    .then((restaurantData) => {
      res.render("index", { restaurantData });
    })
    .catch((err) => console.log(err));
});

//! 匯出模組
module.exports = router;
