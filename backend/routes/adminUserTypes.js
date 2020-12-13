const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { AdminUserType, validate } = require("../models/adminUserTypes");


const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const adminUserTypes = await AdminUserType.find({});
  res.send(adminUserTypes);
});

router.get("/:id", async (req, res) => {
  
  const adminUserType = await AdminUserType.findById(req.params.id).exec();

  if (!adminUserType) {
    res
      .status(404)
      .send(`The adminUserType with given Id:${req.params.id} does not exist`);
    return;
  }

  res.send(adminUserType);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let adminUserType = new AdminUserType({ name: req.body.name });
  const adminUserType_saved = await adminUserType.save();

  res.send(adminUserType_saved);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  // we first check if the adminUserTypes exists, if it does not by convention we should rtn status 404
  //which means not found
  let adminUserType = await AdminUserType.findById(req.params.id).exec();
  //console.log("adminUserType to update", adminUserType);
  //console.log("new name", req.body.name);
  if (!adminUserType) {
    res
      .status(404)
      .send(`The adminUserType with give Id:${req.params.id} does not exist`);
    return;
  }

  // if everything ok, update the adminUserTypes
  //the input is coming from req.body
  //add a ppty to adminUserType object
  adminUserType.name = req.body.name;
  //save update doc to Db
  const adminUserType_saved = await adminUserType.save();
  //send the updated adminUserTypes to the client
  res.send(adminUserType_saved);
});

router.delete("/:id", async (req, res) => {
  const adminUserType = await AdminUserType.findByIdAndRemove(
    req.params.id
  ).exec();

  if (!adminUserType)
    return res
      .status(404)
      .send("The adminUserType with the given ID was not found.");

  res.send(adminUserType);
});


module.exports = router;
