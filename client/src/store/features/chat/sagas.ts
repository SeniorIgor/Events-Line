import { END, eventChannel } from 'redux-saga';
import { call, cancelled, delay, fork, put, race, take } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';

import { Message } from '@/src/types';

import { channelOff, channelOn, serverOff, serverOn, startChannel, stopChannel, updateMessages } from './actions';
import { connect, disconnect, getSocketInstance, reconnect } from './utils';

const createSocketChannel = (localSocket: Socket) => {
  return eventChannel((emit) => {
    const handler = (data: Array<Message>) => {
      if (!data) {
        emit(END);
      } else {
        emit(data);
      }
    };

    localSocket.on('message', handler);

    return () => {
      localSocket.off('message', handler);
    };
  });
};

// connection monitoring sagas
function* listenDisconnectSaga() {
  while (true) {
    yield call(disconnect);
    yield put(serverOff());
  }
}

function* listenConnectSaga() {
  while (true) {
    yield call(reconnect);
    yield put(serverOn());
  }
}

// Saga to switch on channel.
function* listenServerSaga() {
  try {
    yield put(channelOn);

    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000),
    });

    if (timeout) {
      yield put(serverOff());
    }

    const socket: Socket = yield call(connect);
    const socketChannel = yield call(createSocketChannel, socket);

    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);

    yield put(serverOn());

    while (true) {
      const payload: Array<Message> = yield take(socketChannel);
      yield put(updateMessages(payload));

      // Adding switch to handle all type on messages
    }
  } catch (error) {
    console.info(error);
  } finally {
    if (yield cancelled()) {
      const socket = getSocketInstance();
      socket.disconnect();
      // socket.disconnect(true);

      yield put(channelOff());
    }
  }
}

// saga listens for start and stop actions
export function* startStopChannel() {
  while (true) {
    yield take(startChannel);

    yield race({
      task: call(listenServerSaga),
      cancel: take(stopChannel),
    });
  }
}

export default startStopChannel;
