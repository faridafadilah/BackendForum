module.exports = (sequelize, Sequelize) => {
  const Diskusi = sequelize.define("diskusi", {
    nameUser: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    subId: {
      type: Sequelize.INTEGER,
    }
  });

  return Diskusi;
};
