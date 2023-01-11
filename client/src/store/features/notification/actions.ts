import { createAction } from '@reduxjs/toolkit';

import { AppNotification } from '@/src/types';

export const changeNotification = createAction<AppNotification>('notification/change');
export const resetNotification = createAction('notification/reset');
