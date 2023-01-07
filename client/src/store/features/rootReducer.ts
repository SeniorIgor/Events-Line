import { combineReducers } from '@reduxjs/toolkit';

import chat from './chat/reducers';
import user from './user/reducers';

const rootReducer = combineReducers({
  user,
  chat,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
