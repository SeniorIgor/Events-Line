import { all, spawn } from 'redux-saga/effects';

import chatSaga from './chat/sagas';
import userSaga from './user/sagas';

function* rootSaga() {
  const sagas = [userSaga, chatSaga];

  yield all(sagas.map((s) => spawn(s)));
}

export default rootSaga;
