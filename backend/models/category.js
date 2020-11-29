const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create an instance of the Schema
const menuCategorySchema = new Schema({
 // _id: String,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }

 
});

const Category = mongoose.model("Category", menuCategorySchema);



function validateMenuCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
    
  });
  return schema.validate({ name: category });
}





exports.menuCategorySchema = menuCategorySchema;
exports.Category = Category; 
exports.validate = validateMenuCategory;



// function validateGenre(genre) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required()
//   };

//   return Joi.validate(genre, schema);
// }

// exports.genreSchema = genreSchema;
// exports.Genre = Genre; 
// exports.validate = validateGenre;