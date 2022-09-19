module.exports = (sequelize, Sequelize) => {
  const mainForum = sequelize.define("mainforum", {
    nameMainForum: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });

  return mainForum;
};