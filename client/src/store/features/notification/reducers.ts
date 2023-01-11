import { createReducer } from '@reduxjs/toolkit';

import { AppNotification } from '@/src/types';

import { changeNotification, resetNotification } from './actions';

export interface NotificationState {
  notification: AppNotification | null;
}

const initialState: NotificationState = {
  notification: null,
};

const notificationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeNotification, (state, { payload }) => ({
      ...state,
      notification: payload,
    }))
    .addCase(resetNotification, (state) => ({
      ...state,
      notification: null,
    }));
});

export default notificationReducer;
