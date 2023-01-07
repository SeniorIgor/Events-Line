import { io, Socket } from 'socket.io-client';

const socketServerURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx';

let socket: Socket;

export const connect = () => {
  socket = io(socketServerURL);

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

export const disconnect = () => {
  socket = io(socketServerURL);

  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

export const reconnect = () => {
  socket = io(socketServerURL);

  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

export const getSocketInstance = () => {
  return socket;
};
