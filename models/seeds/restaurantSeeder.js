const mongoose = require("mongoose");
<<<<<<< HEAD
const Restaurant = require("../Restaurants");
const restaurantList = require("../../restaurant.json").results;
=======
const Restaurant = require("../Restaurant");
const restaurantList = require("../../restaurant.json").results;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
>>>>>>> 31c0196334c3dc9e9fb6e3a52bab00083b6e5c1b

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
<<<<<<< HEAD

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

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
=======
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!");
      db.close();
    })
    .catch((err) => console.log(error));
>>>>>>> 31c0196334c3dc9e9fb6e3a52bab00083b6e5c1b
});
