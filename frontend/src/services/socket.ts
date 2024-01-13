import { io, Socket } from 'socket.io-client';

const URL = process.env.REACT_APP_API_BASE_URL ?? '';

let socket: Socket;

export const initialize = (token: string) => {
  socket = io(URL, { auth: { token } });

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });
};

export const getSocket = () => socket;
