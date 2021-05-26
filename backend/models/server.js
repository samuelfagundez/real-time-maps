// Express server
const express = require("express");

const http = require("http");
const socketio = require("socket.io");

const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuración del socket server
    this.io = socketio(this.server, {
      /* Configuraciones */
    });
  }

  middlewares() {
    // Desplegar el directorio publico
    this.app.use(express.static(`${__dirname}/../` + "/public"));
    //CORS
    this.app.use(cors());
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  runServer() {
    // Inicializar middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Iniciar server
    this.server.listen(this.port, () => {
      console.log(`Server corriendo en puerto: `, this.port);
    });
  }
}

module.exports = Server;
