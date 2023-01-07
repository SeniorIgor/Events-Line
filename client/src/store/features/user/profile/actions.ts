import { createAction } from '@reduxjs/toolkit';

import { User } from '@/src/types/user';

export const loadProfileRequest = createAction('user/profile/load/request');
export const loadProfileSuccess = createAction<User>('user/profile/load/success');
export const loadProfileFailure = createAction<string>('user/profile/load/fail');
