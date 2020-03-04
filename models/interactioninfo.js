

module.exports = (sequelize, DataTypes) => {
  const interactionInfo = sequelize.define('interactionInfo', {
    clipId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    },
    interactions: {
      type: DataTypes.JSON,
    },
  }, {});
  interactionInfo.findInteractionData = clipId => interactionInfo.findOne({ where: { clipId } })
    .then(response => response);
  interactionInfo.insertInteractionInfo = (clipId, interactions) => interactionInfo.create({
    clipId,
    interactions,
  }).then(response => response);
  interactionInfo.updateInfo = (clipId, interactions) => interactionInfo.update({ interactions },
    { returning: true, where: { clipId } })
    .then(([rowsUpdate, [updatedInfo]]) => updatedInfo);
  return interactionInfo;
};
