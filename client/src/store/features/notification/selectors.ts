import { RootState } from '../rootReducer';

export const selectNotification = (state: RootState) => state.notification.notification;
