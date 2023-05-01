if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Restaurant = require("../Restaurants");
const restaurantList = require("../../restaurant.json").results;
const db = require("../../config/mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../models/users");
const SEED_USER = {
  name: "root",
  email: "root@example.com",
  password: "12345678",
};
db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      const restaurantListWithUserId = restaurantList.map((restaurant) => ({
        ...restaurant,
        userId,
      }));
      return Restaurant.create(restaurantListWithUserId);
    })
    .then(() => {
      console.log("RestaurantSeeder done!");
      process.exit();
    })
    .catch((err) => console.log(err));
});
// console.log("running restaurantSeeder script...");
//   Restaurant.create(restaurantList)
