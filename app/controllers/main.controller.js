const db = require("../models"); // Call Model
const mainForum = db.main; // Call Model Main Forum
const Op = db.Sequelize.Op; // Selection [ , ]

// Create and Save a new main
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nameMainForum) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  mainForum.findOne({
    where: {
      name: req.body.nameMainForum
    }
  }).then(main => {
    if (main) {
      res.status(400).send({
        message: 'Failed! Name is already in use!'
      });
      return false;
    } else {
    // Create a main
    const main = {
      nameMainForum: req.body.nameMainForum,
      description: req.body.description,
      userId: req.body.userId,
    };

    // Save mainForum in the database
    mainForum
      .create(main)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the main forum.",
        });
      });
    }
  });
};

// Retrieve all main from the database.
exports.findAll = (req, res) => {
  const nameMainForum = req.query.nameMainForum;
  var condition = nameMainForum
    ? {
        nameMainForum: {
          [Op.iLike]: `%${nameMainForum}%`,
        },
      }
    : null;

  mainForum
    .findAll({
      where: condition,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mainForums.",
      });
    });
};

// Find a main Forum with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  mainForum
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find mainForum with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving mainForum with id=" + id,
      });
    });
};
