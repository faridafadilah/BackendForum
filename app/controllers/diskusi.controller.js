const db = require("../models"); // Call Model
const Diskusi = db.diskusi; // Call Model Diskusi
const Op = db.Sequelize.Op; // Selection [ , ]

// Create and Save a new diskusi
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nameUser) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a diskusi
  const diskusi = {
    name: req.body.nameUser,
    image: req.body.imageUser,
    comment: req.body.comment,
    userId: req.body.userId,
    subId: req.body.subId,
  };

  // Save Diskusi in the database
  Diskusi.create(diskusi)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the main forum.",
      });
    });
};

// Retrieve all diskusi from the database.
exports.findAll = (req, res) => {
  const nameUser = req.query.nameUser;
  var condition = nameUser
    ? {
        nameUser: {
          [Op.iLike]: `%${nameUser}%`,
        },
      }
    : null;

  Diskusi.findAll({
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

// Find a Diskusi with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Diskusi.findByPk(id)
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

// Delete Diskusi
exports.delete = (req, res) => {
  const id = req.params.id;

  Diskusi.destroy({
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
