const Hapi = require('@hapi/hapi');
const routes = require('./routes/index');
const getEmotion = require('./sentimentAnalyzer');

const server = Hapi.server({
  host: '0.0.0.0',
  port: process.env.PORT,
  routes: { cors: true },
});
let listOfAllActiveUsers = [];
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
  socket.on('SEND_MESSAGE', (data) => {
    console.log(getEmotion(data));
    io.emit('RECEIVE_MESSAGE', data);
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
