//! 載入所需工具包
const express = require("express");
const routes = require("./routes");
const methodOverride = require("method-override");
const port = 3000;
const exphbs = require("express-handlebars");
const session = require("express-session");
require("./config/mongoose");
//! 樣板引擎設定
const app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "ThisIsMySecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(routes);
//! start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
