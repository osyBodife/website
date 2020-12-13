const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create an instance of the Schema
const adminUserTypeSchema = new Schema({
 // _id: String,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }

 
});

const AdminUserType = mongoose.model("AdminUserType", adminUserTypeSchema);



function validateAdminUserType(adminUserType) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
    
  });
  return schema.validate({ name: adminUserType });
}





exports.adminUserTypeSchema = adminUserTypeSchema;
exports.AdminUserType = AdminUserType; 
exports.validate = validateAdminUserType;