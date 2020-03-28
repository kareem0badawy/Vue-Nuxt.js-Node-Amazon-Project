const router = require('express').Router();
const Category = require('../models/category');


// Post Request  -  Create a new Category

  router.post("/category", async(req, res) => {
      try{
        const category = new Category();
        category.type  = req.body.type;

        await category.save();
        res.json({
            status : true,
            message: "Successfuly Save new category ...!"
        });
      } catch(err) {
        res.status(500).json({
            status : false,
            message: err.message
        });
      }
  });



  // GET Request Category

  router.get("/category", async(req, res) => {
    try{
      const categories = await Category.find();
      res.json({
          status : true,
          categories: categories
      });
    } catch(err) {
      res.status(500).json({
          status : false,
          message: err.message
      });
    }
});



  module.exports = router;
