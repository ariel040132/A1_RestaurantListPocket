const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurants");

//! 新增餐廳 - finished
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//! 餐廳詳情- finished
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurants) => {
      res.render("show", { restaurants });
    })
    .catch((err) => console.log(error));
});

//! 編輯餐廳 - finished
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => {
      res.render("edit", { restaurantData });
    })
    .catch((err) => console.log(err));
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndUpdate(id, req.body)
    .then((result) => {
      console.log(result);
      res.redirect(`/restaurants/${result._id}`);
    })
    .catch((err) => console.log(err));
});

//! 刪除餐廳 - finished
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndRemove(id)
    .lean()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});
//! 匯出路由器模組
module.exports = router;
