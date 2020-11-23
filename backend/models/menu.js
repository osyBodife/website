const Joi = require("joi");
const mongoose = require("mongoose");
const { menuCategorySchema } = require("./category");

const Schema = mongoose.Schema;

//create an instance of the Schema
const menuSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  category: {
    type: menuCategorySchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

function validateMenu(menu) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    categoryId: Joi.objectId().required(),
    price: Joi.number().min(0).required(),
  };

  return Joi.validate(menu, schema);
}

exports.Menu = Menu;
exports.validate = validateMenu;

/*
Note
1. In creating a menu, we need the title, categoryId, and price
2. With categoryId we do a query to db, if it exists we assign to a constant
3. #2 above creates a object, with that we can get category._id and category.name


*/
