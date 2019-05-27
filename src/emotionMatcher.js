const getEmoji = (tone) => {
  switch (tone) {
    case 'anger':
      return ':(';
    case 'fear':
      return ':(';
    case 'joy':
      return ':)';
    case 'sadness':
      return ':(';
    case 'analytical':
      return ':|';
    case 'confident':
      return ':)';
    default:
      return ':|';
  }
};
module.exports = getEmoji;
