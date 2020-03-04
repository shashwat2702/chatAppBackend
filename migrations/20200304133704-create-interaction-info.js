

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('interactionInfos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    clipId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      unique: true,
    },
    interactions: {
      type: Sequelize.JSON,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('interactionInfos'),
};
