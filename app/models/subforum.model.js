module.exports = (sequelize, Sequelize) => {
  const subForum = sequelize.define("subforum", {
    nameSubForum: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    mainforumId: {
      type: Sequelize.INTEGER
    }
  });

  return subForum;
};