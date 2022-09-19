const db = require("../models"); // Call Model
const config = require("../config/auth.config"); // Call Secret key
const User = db.user; // Call Model User
const Role = db.role; // Call Model Role

// Selection []
const Op = db.Sequelize.Op;
// Import jwt
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// For Register
// signup: membuat User baru di database (role user jika tidak menentukan peran)
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              message: "User registered successfully!",
            });
            // res.redirect('/login');
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({
            message: "User registered successfully!",
          });
          // res.redirect('/login');
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
      // res.redirect('/register');
    });
};

// For Login
exports.signin = (req, res) => {
  // temukan username dalam database, jika ada
  User.findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // bandingkan password dengan password di database menggunakan bcrypt , jika benar
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      // token jwr for sign
      var token = jwt.sign({
          id: user.id,
        },
        config.secret, {
          expiresIn: 86400, // 24 hours
        }
      );
      // hasilkan token menggunakan jsonwebtoken
      // kembalikan informasi pengguna & akses Token
      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};