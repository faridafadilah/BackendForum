module.exports = app => {
    const sub = require('../controllers/sub.controller');
  
    var router = require("express").Router();
  
    // Create a new main Forum
    router.post("/", sub.create);
  
    // Retrieve all sub
    router.get("/", sub.findAll);
  
    // Retrieve a single sub Forum with id
    router.get("/:id", sub.findOne);

    // Update a Tutorial with id
    router.put("/:id", sub.update);

    // Delete a Tutorial with id
    router.delete("/:id", sub.delete);

    app.use('/api/sub', router);
};