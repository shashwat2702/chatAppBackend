const Hapi = require('@hapi/hapi');
const routes = require('./routes/index');

const server = Hapi.server({
  host: 'localhost',
  port: 8080,
  routes: { cors: true },
});

server.route(routes());
// eslint-disable-next-line import/order
const io = require('socket.io')(server.listener);

io.on('connection', (socket) => {
  console.log('connected', socket.id);

  socket.on('SEND_MESSAGE', (data) => {
    console.log(data);
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
