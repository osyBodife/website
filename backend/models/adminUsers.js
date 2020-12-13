const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require("mongoose");
const { adminUserTypeSchema } = require("./adminUserTypes");

const Schema = mongoose.Schema;

//create an instance of the Schema
const adminUserSchema = new Schema({
  //_id: mongoose.Types.ObjectId,
 name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
 adminUserType: {
    type: adminUserTypeSchema,
    required: true,
  },
  password:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024

  },
  username:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true

  }
  
});

const AdminUser = mongoose.model("AdminUser", adminUserSchema);



function validateAdminUser(adminUser) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    username:Joi.string()
    .min(5)
    .max(255)
    .required()
    .email(),
    
    adminUserTypeId: Joi.objectId().required(),
    password:   Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

    
    
  });
  //.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  return schema.validate({ 
    name:adminUser.name,
    adminUserTypeId:adminUser.adminUserTypeId,
    username:adminUser.username,
    password:adminUser.password

   
  
  });
}




exports.AdminUser = AdminUser;
exports.validate = validateAdminUser;

/*

email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
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

data: { name: "", username: "", password: "" },
    adminUserTypes: [],
*/
