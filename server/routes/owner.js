const router = require('express').Router();
const Owner = require('../models/owner');
const upload = require('../middlewares/upload-photo');


// Post Request  -  Create a new Owner

  // router.post("/owner", async(req, res) => {
  router.post("/owner", upload.single("photo"), async(req, res) => {

      try{
        const owner = new Owner();
        owner.name  = req.body.name;
        owner.about  = req.body.about;
        owner.photo  = req.file.location;

        await owner.save();
        res.json({
            status : true,
            message: "Successfuly Save new owner ...!"
        });
      } catch(err) {
        res.status(500).json({
            status : false,
            message: err.message
        });
      }
  });



  // GET Request Owner

  router.get("/owner", async(req, res) => {
    try{
      const owners = await Owner.find();
      res.json({
          status : true,
          owners: owners
      });
    } catch(err) {
      res.status(500).json({
          status : false,
          message: err.message
      });
    }
});



  module.exports = router;
