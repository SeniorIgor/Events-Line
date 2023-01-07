import { createReducer } from '@reduxjs/toolkit';

import { User } from '@/src/types';

import { loadProfileFailure, loadProfileRequest, loadProfileSuccess } from './actions';

export interface UserProfileState extends User {
  isLoading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  firstName: '',
  lastName: '',
  email: '',
  isLoading: false,
  error: null,
};

const profile = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProfileRequest, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }))
    .addCase(loadProfileSuccess, (state, { payload }) => ({
      ...state,
      ...payload,
      isLoading: false,
    }))
    .addCase(loadProfileFailure, (state, { payload }) => ({
      ...state,
      error: payload,
      isLoading: false,
    }));
});

export default profile;
