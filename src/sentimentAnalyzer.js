const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
// anger, fear, joy, and sadness (emotional tones);
// analytical, confident, and tentative (language tones).
const getEmotion = (text) => {
  const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    iam_apikey: 'uo-tQKdSrjG4jGdWJKzLdGvwmUfE2NNndNw6noJxVDBG',
    url: 'https://gateway-lon.watsonplatform.net/tone-analyzer/api',
  });

  const toneParams = {
    tone_input: { text },
    content_type: 'application/json',
  };

  return toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => (JSON.stringify(toneAnalysis, null, 2)))
    .catch((err) => {
      console.log('error:', err);
    });
};


module.exports = getEmotion;
