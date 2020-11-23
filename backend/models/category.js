const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create an instance of the Schema
const menuCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }

 
});

const Category = mongoose.model("Category", menuCategorySchema);



function validateMenuCategory(category) {
  const schema = {
    name: Joi.string().min(3).max(50).required()
  };

  return Joi.validate(category, schema);
}

exports.menuCategorySchema = menuCategorySchema;
exports.Category = Category; 
exports.validate = validateMenuCategory;