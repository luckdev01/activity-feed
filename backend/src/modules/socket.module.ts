import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

type ISocketEvent = 'postEvent';

let io: SocketServer;

export function initialize(httpServer: HttpServer) {
  io = new SocketServer(httpServer, {
    cors: { origin: process.env.ORIGIN },
  });

  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('event', msg => {
      io.emit('event', msg);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });
}

export function getSocket() {
  return io;
}

export function emitEvent(event: ISocketEvent, data: unknown) {
  return io.emit(event, data);
}
