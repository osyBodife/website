const express=require('express')
const router=express.Router()



  router.get('/', (req, res)=>{
    res.send('Welcome to ChinaMoon');
})


  //we export the router
  module.exports=router;