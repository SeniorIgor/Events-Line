import { all, fork, put, takeLatest } from 'redux-saga/effects';

import { User } from '@/src/types';

import { loadProfileRequest, loadProfileSuccess } from './actions';

const mockUser: User = {
  email: 'user@test.com',
  firstName: 'Dmitri',
  lastName: 'Ivanov',
};

function* loadProfileWorker() {
  yield put(loadProfileSuccess(mockUser));

  // const { status, data, error = '' }: Awaited<ReturnType<typeof getUserProfile>> = yield getUserProfile();

  // if (status === 200 && data) {
  //   yield put(loadProfileSuccess(formatUser(data)));
  // } else {
  //   yield put(loadProfileFailure(error));
  // }
}

function* loadProfileWatcher() {
  yield takeLatest(loadProfileRequest.type, loadProfileWorker);
}

function* userProfileWatcher() {
  const sagas = [loadProfileWatcher];

  yield all(sagas.map((s) => fork(s)));
}

export default userProfileWatcher;
