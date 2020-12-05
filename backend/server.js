const express = require("express");
const app = express();
const categories_router = require("./routes/categories");
const menu_router = require("./routes/menus");
const home_router = require("./routes/home");
app.use(express.json());
const { Menu } = require("./models/menu");
const { Category } = require("./models/category");

const mongoose = require("mongoose");

//mongoose.set('debug', true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);


app.use("/api/categories", categories_router);
app.use("/", home_router);
app.use("/api/menus", menu_router);

mongoose
  .connect("mongodb://localhost/chinamoondb")
  .then(() => console.log("connected to mongoDb......"))
  .catch((err) =>
    console.error("could not connect to mongodb....", err.message)
  );

async function createMenu() {
  const menu = new Menu({
    title: "Oat Meal",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
    price: 3.99,
  });
  const result = await menu.save();
  console.log(result);
}
//call or invoke our function
//createMenu();

//querying the Db
async function getMenus() {
  //const results = await Menu.find();
  //find() method with filters
  const results = await Menu.find()
    .sort({ name: 1 })
    .select({ title: 1, category: 1, price: 1 });
  console.log(results);
}
getMenus();

async function createMenuCategory() {
  const menuCategory = new Category({
    name: "Thanksgiving Lunch",
  });
  const result = await menuCategory.save();
  console.log(result);
}
//createMenuCategory();

//querying the Db
async function getMenuCategories() {
  const results = await Category.find().sort({ name: 1 });

  console.log(results);
}
//getMenuCategories();

const port = process.env.PORT || 3300;
// create a listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
