const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { AdminUser, validate } = require("../models/adminUsers");

const { AdminUserType } = require("../models/adminUserTypes");

router.get("/", async (req, res) => {
  // find all documents
  ///await MyModel.find({});
  const adminUsers = await AdminUser.find({});

  res.send(adminUsers);
});

router.get("/:id", async (req, res) => {
  try {
    const adminUser = await AdminUser.findById(req.params.id);
    res.send(adminUser);
  } catch (ex) {
    res
      .status(404)
      .send(`The AdminUser with given Id:${req.params.id} does not exist`);
    return;
  }
});

router.post("/", async (req, res) => {
  try {
    //console.log("our data", req.body)
    const { error, value } = validate(req.body);

    const adminUserType = await AdminUserType.findById(
      req.body.adminUserTypeId
    );

    const adminUser = new AdminUser({
      name: req.body.name,
      username: req.body.username,
      adminUserType: {
        _id: adminUserType._id,
        name: adminUserType.name,
      },
      password: req.body.password,
    });
    //save in Db
    await adminUser.save();
    res.send(adminUser);
  } catch (ex) {
    res.status(404).send(`Invalid data input`);
    return;
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const adminUserTypeDb = await AdminUserType.findById(
    req.body.adminUserTypeId
  );
  if (!adminUserTypeDb) return res.status(400).send("Invalid adminUserTypeId.");

  const adminUser = await AdminUser.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      adminUserType: {
        _id: adminUserTypeDb._id,
        name: adminUserTypeDb.name,
      },
      username: req.body.username,
      password: req.body.password,
    },
    { new: true }
  );

  if (!adminUser) {
    return res
      .status(404)
      .send("The adminUser with the given ID was not found.");
  } else {
    res.send(adminUser);
  }
});

router.delete("/:id", async (req, res) => {
  const adminUser = await AdminUser.findByIdAndRemove(req.params.id);

  if (!adminUser)
    return res
      .status(404)
      .send(`The Admin User with given Id:${req.params.id} not found`);

  res.send(adminUser);
});

module.exports = router;
