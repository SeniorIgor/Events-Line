import { RootState } from '../rootReducer';

export const selectChatMessages = (state: RootState) => state.chat.messages;
