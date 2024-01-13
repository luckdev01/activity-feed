import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../middleware/auth.middleware';

type ISocketEvent = 'postEvent';
type IAuthTokenPayload = any;

let io: SocketServer;

export function initialize(httpServer: HttpServer) {
  io = new SocketServer(httpServer, {
    cors: { origin: process.env.ORIGIN },
  });

  io.use(async (socket, next) => {
    const { token } = socket.handshake.auth;
    if (!token) {
      return next(new Error('Socket unauthorized'));
    }

    let tokenParsed: IAuthTokenPayload;
    try {
      tokenParsed = jwt.verify(token, jwtSecretKey);
    } catch (error) {
      return next(new Error('Socket session expired'));
    }
    socket.data = tokenParsed;
    next();
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
