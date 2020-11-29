const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require("mongoose");
const { menuCategorySchema } = require("./category");

const Schema = mongoose.Schema;

//create an instance of the Schema
const menuSchema = new Schema({
  //_id: String,
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
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    categoryId: Joi.objectId().required(),
    price: Joi.number().min(0).required(),
    
  });
  return schema.validate({ 
    title:menu.title,
    categoryId:menu.categoryId,
    price:menu.price
  
  });
}




exports.Menu = Menu;
exports.validate = validateMenu;

/*
//categoryId:menu.categoryId,
categoryId: Joi.string().alphanum().required()
categoryId: Joi.objectId().required(),
Note
1. In creating a menu, we need the title, categoryId, and price
2. With categoryId we do a query to db, if it exists we assign to a constant
3. #2 above creates a object, with that we can get category._id and category.name
const MyDataSchema = new Schema({
  _id: String,
...
...
}
schema.validate({ username: 'abc', birth_year: 1994 });
*/
