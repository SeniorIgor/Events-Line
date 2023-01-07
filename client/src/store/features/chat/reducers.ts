import { createReducer } from '@reduxjs/toolkit';

import { Message } from '@/src/types';

import { channelOff, channelOn, serverOff, serverOn, updateMessages } from './actions';

type ChatStateStatus = 'on' | 'off';

export interface ChatState {
  messages: Array<Message>;
  channelStatus: ChatStateStatus;
  serverStatus: ChatStateStatus;
}

const initialState: ChatState = {
  messages: [],
  channelStatus: 'off',
  serverStatus: 'off',
};

const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateMessages, (state, { payload }) => ({
      ...state,
      messages: [...state.messages, ...payload],
    }))
    .addCase(channelOn, (state) => ({ ...state, channelStatus: 'on' }))
    .addCase(channelOff, (state) => ({ ...state, channelStatus: 'off' }))
    .addCase(serverOn, (state) => ({ ...state, serverStatus: 'on' }))
    .addCase(serverOff, (state) => ({ ...state, serverStatus: 'off' }));
});

export default chatReducer;
