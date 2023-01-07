import { RootState } from '../../rootReducer';

export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserName = (state: RootState) =>
  state.user.profile.firstName +
  (state.user.profile.firstName && state.user.profile.lastName ? ` ${state.user.profile.lastName}` : '');
