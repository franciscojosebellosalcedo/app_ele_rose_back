
import { Server as HttpServer } from 'http';

import { Server, Socket } from 'socket.io';

let listClientConected : any[] = [];

export const initSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket: Socket) => {
		console.log('Nuevo cliente conectado', socket.id);
    listClientConected.push(socket.id);

    socket.on("get:amount", ()=>{
      
      io.emit("get:amount", listClientConected.length);
    });

    socket.on('disconnect', () => {

			listClientConected= listClientConected.filter((item) => item !== socket.id);
      
      io.emit("get:amount", listClientConected.length);

      console.log('Cliente desconectado');
    });

  });

  return io;
}