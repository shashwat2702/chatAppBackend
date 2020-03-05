const model = require('./../../models');

module.exports = {
  method: 'GET',
  path: '/interactions/{clipId}',
  handler: async (req, h) => {
    const { clipId } = req.params;
    const interactionData = await model.interactionInfo.findInteractionData(clipId);
    if (interactionData) {
      return h.response({ interactions: interactionData.interactions, clipId: interactionData.clipId, success: true }).code(200);
    }
    return h.response({ message: 'Id not found', success: false }).code(200);
  },
};
