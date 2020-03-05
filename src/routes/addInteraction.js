const model = require('./../../models');

module.exports = {
  method: 'POST',
  path: '/interactions',
  handler: async (req, h) => {
    const { clipId, interactions } = req.payload;
    const interactionData = await model.interactionInfo.findInteractionData(clipId);
    if (interactionData) {
      const updatedData = await model.interactionInfo.updateInfo(clipId, interactions);
      if (updatedData) {
        return h.response({ ...updatedData, success: true }).code(200);
      }
      return h.response({ success: false }).code(400);
    }
    const createdData = await model.interactionInfo.insertInteractionInfo(clipId, interactions);
    if (createdData) {
      return h.response({ ...createdData, success: true }).code(201);
    }
    return h.response({ success: false }).code(400);
  },
};
