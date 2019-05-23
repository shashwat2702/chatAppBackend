const Hapi = require('@hapi/hapi');
const routes = require('./routes/index');

const server = Hapi.server({
  host: '0.0.0.0',
  port: process.env.PORT,
  routes: { cors: true },
});
let listOfAllActiveUsers = [];

server.route(routes());
// eslint-disable-next-line import/order
const io = require('socket.io')(server.listener);

io.on('connection', (socket) => {
  console.log('connected', socket.id);
  socket.on('NEW USER', (data) => {
    if (!listOfAllActiveUsers.includes(data.username)) {
      listOfAllActiveUsers.push(data.username);
      io.emit('LIST OF ACTIVE USERS', listOfAllActiveUsers);
    }
  });

  socket.on('USER DISCONNECTED', (data) => {
    console.log('USER DISCONNECTED', data);
    listOfAllActiveUsers = listOfAllActiveUsers.filter(user => user !== data.username);
    io.emit('LIST OF ACTIVE USERS', listOfAllActiveUsers);
  });

  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);
  });
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
