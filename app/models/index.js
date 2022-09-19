const config = require('../config/db'); // Import Database

// Konfigurasi Database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.main = require('../models/mainforum.model')(sequelize, Sequelize);
db.sub = require('../models/subforum.model')(sequelize, Sequelize);
db.diskusi = require('../models/diskusi.model')(sequelize, Sequelize);

// Relasi Table
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
});
db.main.belongsTo(db.user, {
  foreignKey: 'userId'
});
db.main.hasMany(db.sub);
db.diskusi.belongsTo(db.user, {
  foreignKey: 'userId'
});
db.diskusi.belongsTo(db.sub, {
  foreignKey: 'subId'
});

db.ROLES = ['user', 'admin', 'superadmin'];

module.exports = db;