const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurants");
const User = require("../../models/users");

//! 新增餐廳 - finished
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/", (req, res) => {
  const userId = req.user._id;
  const restaurant = {
    ...req.body,
    userId: userId,
  };
  return Restaurant.create(restaurant)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//! 餐廳詳情- finished
router.get("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurants) => {
      res.render("show", { restaurants });
    })
    .catch((err) => console.log(error));
});

//! 編輯餐廳 - finished
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurantData) => {
      res.render("edit", { restaurantData });
    })
    .catch((err) => console.log(err));
});
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const updateObj = { ...req.body, userId };
  Restaurant.findByIdAndUpdate(_id, updateObj)
    .then((result) => {
      console.log(result);
      res.redirect(`/restaurants/${result._id}`);
    })
    .catch((err) => console.log(err));
});

//! 刪除餐廳 - finished
router.delete("/:id", (req, res) => {
  // const deleteCheck = confirm("確定要刪除這家餐廳嗎？");
  // if (!deleteCheck) {
  //   return;
  // }
  const id = req.params.id;
  const userId = req.user._id;
  return Restaurant.findByIdAndRemove(id)
    .lean()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});
//! 匯出路由器模組
module.exports = router;
