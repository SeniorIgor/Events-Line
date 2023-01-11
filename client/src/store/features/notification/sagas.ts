import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { changeNotification, resetNotification } from './actions';

function* changeNotificationWatcher({ payload }: ReturnType<typeof changeNotification>) {
  if (payload.status === 'success' || payload.status === 'error') {
    yield delay(3000);

    yield put(resetNotification());
  }
}

function* notificationWatcher() {
  yield all([takeLatest(changeNotification.type, changeNotificationWatcher)]);
}

export default notificationWatcher;
