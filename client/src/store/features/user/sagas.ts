import { all, fork } from 'redux-saga/effects';

import profileSaga from './profile/sagas';

function* userSaga() {
  const sagas = [profileSaga];

  yield all(sagas.map((s) => fork(s)));
}

export default userSaga;
