const db = require("../models"); // Call Model
const subForum = db.sub; // Call Model Sub Forum
const Op = db.Sequelize.Op; // Selection [ , ]

// Create and Save a new Sub Forum
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nameSubForum) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  subForum.findOne({
    where: {
      name: req.body.nameSubForum
    }
  }).then(sub => {
    if (sub) {
      res.status(400).send({
        message: 'Failed! Name is already in use!'
      });
      return false;
    } else {
      // Create a Sub Forum
  const sub = {
    nameSubForum: req.body.nameSubForum,
    description: req.body.description,
    mainforumId: req.body.mainforumId
  };
  
  // Save Sub Forum in the database
  subForum
    .create(sub)
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

// Retrieve all Sub Forum from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      }
    : null;

  subForum
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

// Find a Sub Forum with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  subForum
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

// Update Sub Forum
exports.update = (req, res) => {
  const id = req.params.id;

  subForum
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Sub Forum was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Sub Forum with id=${id}. Maybe Sub Forum was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Sub Forum with id=" + id,
      });
    });
};

// Delete Sub Forum
exports.delete = (req, res) => {
  const id = req.params.id;

  subForum
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Sub Forum was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Sub Forum with id=${id}. Maybe Sub Forum was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Sub Forum with id=" + id,
      });
    });
};