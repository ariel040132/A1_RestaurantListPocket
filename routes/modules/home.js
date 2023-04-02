const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurants");
//! 首頁 - finished
router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then((restaurantData) => {
      res.render("index", { restaurantData });
    })
    .catch((err) => console.log(err));
});
//! 搜尋餐廳
router.get("/search", (req, res) => {
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
//! 匯出模組
module.exports = router;
