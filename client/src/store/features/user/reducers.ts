import { combineReducers } from '@reduxjs/toolkit';

import profile from './profile/reducers';

const userReducer = combineReducers({
  profile,
});

export default userReducer;
