if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Restaurant = require("../Restaurants");
const restaurantList = require("../../restaurant.json").results;
const db = require("../../config/mongoose");

db.once("open", () => {
  console.log("running restaurantSeeder script...");
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("RestaurantSeeder done!");
      db.close();
    })
    .catch((err) => console.log(err));

  // Restaurant.create(restaurantList)
  //   .then(() => {
  //     console.log("restaurantSeeder done!");
  //     db.close();
  //   })
  //   .catch((err) => console.log(err));
});
