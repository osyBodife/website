const Joi = require("joi");
const express=require('express')
const router=express.Router()



const categories = [
    { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "Lunch" },
    { _id: "5b21ca3eeb7f6fbccd471820", name: "Dinner" },
   
  ];
  

router.get('/', (req,res)=>{
    res.send(categories)
})


router.get("/:id", (req, res) => {
    //note that the id a STRING, so we do not need
    //parseInt() method
    const category = categories.find((c) => c._id ===(req.params.id));
    //console.log(category);
  
  if (!category) {
    res
      .status(404)
      .send(`The category with given Id:${req.params.id} does not exist`);
    return;
  }

  res.send(category);
})


router.post('/', (req,res)=>{
   
  const { error, value } = validateCategory(req.body.name);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const category = {
      // var num = 15;
     //var n = num.toString();
    _id: (categories.length + 1).toString(),
    name: req.body.name,
  };
  categories.push(category);
  res.send(category);
})


//updating a course
router.put("/:id", (req, res) => {
    // we first check if the course exists, if it does not by convention we should rtn status 404
    //which means not found
    const category = categories.find((c) => c._id ===(req.params.id));
    if (!category) {
      res
        .status(404)
        .send(`The category with give Id:${req.params.id} does not exist`);
      return;
    }
    
  
    //encaspulating validate code in a function
    const { error, value } = validateCategory(req.body.name);
  
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    // if everything ok, update the course
    //the input is coming from req.body
    category.name = req.body.name;
    //send the updated course to the client
    res.send(category);
  });
  
  //handling delete
  router.delete("/:id", (req, res) => {
    //the LOGIc
    //find the course with given id
    const category = categories.find((c) => c._id ===(req.params.id));
    //if it does not exist, rtb=n 404 error
    if (!category) {
      res
        .status(404)
        .send(`The category with give Id:${req.params.id} does not exist`);
      return;
    }
    //bcos we are dealing with an array, we the index of the course to be able to delete it
    const index = categories.indexOf(category);
    // use the splice method to remove it
    categories.splice(index, 1);
    //send the course that was deleted
    res.send(category);
  });
  

function validateCategory(banana) {

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });

    return schema.validate({ name: banana });
  }
  
  
  //we export the router
  module.exports=router;
