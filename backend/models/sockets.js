const Marcadores = require("./marcadores");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
    this.marcadores = new Marcadores();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("cliente conectado!");

      socket.emit("marcadores-activos", this.marcadores.activos);

      socket.on("marcador-nuevo", (marcador) => {
        this.marcadores.agregarMarcador(marcador);
        socket.broadcast.emit("marcador-nuevo", marcador);
      });

      socket.on("marcador-actualizado", (marcador) => {
        this.marcadores.actualizarMarcador(marcador);
        socket.broadcast.emit("marcador-actualizado", marcador);
      });
    });
  }
}

module.exports = Sockets;
