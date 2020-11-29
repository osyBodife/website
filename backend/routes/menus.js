const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { Menu, validate } = require("../models/menu");
const { Category } = require("../models/category");



router.get("/", async (req, res) => {
  // find all documents
  ///await MyModel.find({});
  const menus = await Menu.find({});
  
  res.send(menus);
});

router.get("/:id", async (req, res) => {
    const menu = await Menu.findById(req.params.id); 

  if (!menu) {
    res
      .status(404)
      .send(`The menu with given Id:${req.params.id} does not exist`);
    return;
  }

  res.send(menu);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //access and obtain category with categoryId provided by client
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");
  //create an instance of Menu class based on data obatined from query
  //and client input
  //the instance is what is saved in Db
  const menu = new Menu({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    price: req.body.price,
  });
  //save in Db
  await menu.save();

  res.send(menu);
});


router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //bcos we would need to add category._id and category.name 
  //to the menu object we must find category object associated with menu
  //once found, we assign it a variable and use the variable 
  //to add the ppties
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");
  //find menu with id provided
  //with async and await , no callback fn is reqd
  //findByIdAndUpdate(takes two arguments as ffs ; first
  // is the filter=id, 2nd is update object
  const menu = await Menu.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      price: req.body.price,
    },
    { new: true }
  );

  if (!menu) {
    return res.status(404).send("The menu with the given ID was not found.");
  } else {
    res.send(menu);
  }
});

router.delete("/:id", async (req, res) => {
  const menu = await Menu.findByIdAndRemove(req.params.id);

  if (!menu)
    return res.status(404).send(`The menu with given Id:${req.params.id} not found`);

  res.send(menu);
});

// router.get("/:id", validateObjectId, async (req, res) => {
//   const movie = await Movie.findById(req.params.id).select("-__v");

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

module.exports = router;
