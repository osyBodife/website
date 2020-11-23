const Joi = require("joi");
const express=require('express')
const router=express.Router()

const { Menu, validate } = require("../models/menu");
const { Category } = require("../models/category");

const mongoose = require("mongoose");

const menus = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Breakfast I",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Breakfast II",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
    price: 6.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Dinner I",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Dinner" },
    price: 7.56,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Lunch I",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Lunch" },
    price: 8.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Lunch II",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Lunch" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Lunch III",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Lunch" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Dinner II",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Dinner" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Dinner III",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Dinner" },
    price: 5.99,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Breakfast III",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
    price: 5.99,
  },
];

router.get("/", (req, res) => {
  res.send(menus);
});

router.get("/:id", (req, res) => {
  const menu = menus.find((c) => c._id === req.params.id);

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
  if (!category) return res.status(400).send("Invalid genre.");
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


///copied from movie.js

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //find the menu category
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

router.delete("/:id",  async (req, res) => {
  const menu = await Menu.findByIdAndRemove(req.params.id);

  if (!menu)
    return res.status(404).send("The menu with the given ID was not found.");

  res.send(menu);
});

// router.get("/:id", validateObjectId, async (req, res) => {
//   const movie = await Movie.findById(req.params.id).select("-__v");

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

module.exports = router;
