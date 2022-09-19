module.exports = app => {
    const diskusi = require('../controllers/diskusi.controller');
  
    var router = require("express").Router();
  
    // Create a new diskusi Forum
    router.post("/", diskusi.create);
  
    // Retrieve all diskusi
    router.get("/", diskusi.findAll);
  
    // Retrieve a single diskusi Forum with id
    router.get("/:id", diskusi.findOne);

    // Delete a Tutorial with id
    router.delete("/:id", diskusi.delete);

    app.use('/api/diskusi', router);
};