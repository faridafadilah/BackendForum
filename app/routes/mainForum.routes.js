module.exports = app => {
    const main = require('../controllers/main.controller');
  
    var router = require("express").Router();
  
    // Create a new main Forum
    router.post("/", main.create);
  
    // Retrieve all main
    router.get("/", main.findAll);
  
    // Retrieve a single main Forum with id
    router.get("/:id", main.findOne);

    app.use('/api/main', router);
};