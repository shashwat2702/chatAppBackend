const Hapi = require('@hapi/hapi');
const routes = require('./routes/index');
const getEmotion = require('./sentimentAnalyzer');
const getEmoji = require('./emotionMatcher');

const server = Hapi.server({
  host: 'localhost',
  port: 8080,
  routes: { cors: true },
});
let listOfAllActiveUsers = [];
const comparatorForSorting = (firstObject, secondObject) => {
  if (firstObject.score > secondObject.score) {
    return -1;
  } if (firstObject.score < secondObject.score) {
    return 1;
  }
  return 0;
};

const onConnect = (socket, io) => {
  socket.on('NEW USER', (data) => {
    console.log('NEW USER', data);
    listOfAllActiveUsers.push(data.username);
    io.emit('LIST OF ACTIVE USERS', listOfAllActiveUsers);
  });
  socket.on('USER DISCONNECTED', (data) => {
    console.log('USER DISCONNECTED', data);
    listOfAllActiveUsers = listOfAllActiveUsers.filter(user => user !== data.username);
    console.log(listOfAllActiveUsers);
    io.emit('LIST OF ACTIVE USERS', listOfAllActiveUsers);
    socket.removeAllListeners('SEND_MESSAGE', onConnect);
  });
  socket.on('SEND_MESSAGE', async (data) => {
    const { author, message } = data;
    const em = await getEmotion(message);
    const JSONResponseArray = JSON.parse(em).document_tone.tones;
    JSONResponseArray.sort(comparatorForSorting);
    console.log('EMOTION', data, JSONResponseArray);
    const responseObject = {
      author,
      message: `${message}${' '}${getEmoji((JSONResponseArray[0]) ? JSONResponseArray[0].tone_id : 'okay')}`,
    };
    io.emit('RECEIVE_MESSAGE', responseObject);
  });
  socket.on('disconnect', () => {
    console.log('disconnect');
    socket.removeAllListeners('SEND_MESSAGE', onConnect);
  });
};

server.route(routes());
// eslint-disable-next-line import/order
const io = require('socket.io')(server.listener);

io.sockets.on('connection', (socket) => {
  console.log('connected');
  onConnect(socket, io);
});


const start = async () => {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
};

module.exports = { server, start };
