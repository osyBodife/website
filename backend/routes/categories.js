const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  // find all documents
  ///await MyModel.find({});
  const categories = await Category.find({});

  res.send(categories);
});

router.get("/:id", async (req, res) => {
  //await Adventure.findById(id).exec();

  const category = await Category.findById(req.params.id).exec();

  if (!category) {
    res
      .status(404)
      .send(`The category with given Id:${req.params.id} does not exist`);
    return;
  }

  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let category = new Category({ name: req.body.name });
  category = await category.save();

  res.send(category);
});

///copied from movie.js

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  // we first check if the category exists, if it does not by convention we should rtn status 404
  //which means not found
 let category = await Category.findById(req.params.id).exec();
  console.log("category to update", category)
  console.log("new name", req.body.name)
  if (!category) {
    res
      .status(404)
      .send(`The category with give Id:${req.params.id} does not exist`);
    return;
  }

  // if everything ok, update the category
  //the input is coming from req.body
  category.name = req.body.name;
  //save update doc to Db
  category=await category.save();
  //send the updated category to the client
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id).exec();

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

// router.get("/:id", validateObjectId, async (req, res) => {
//   const movie = await Movie.findById(req.params.id).select("-__v");

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

module.exports = router;
