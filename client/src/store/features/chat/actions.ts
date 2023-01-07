import { createAction } from '@reduxjs/toolkit';

import { Message } from '@/src/types';

// TODO add send message
export const sendMessage = createAction<string>('chat/message/send');

export const updateMessages = createAction<Array<Message>>('chat/messages/update');

export const startChannel = createAction('chat/channel/start');
export const stopChannel = createAction('chat/channel/stop');
export const channelOn = createAction('chat/channel/on');
export const channelOff = createAction('chat/channel/off');
export const serverOn = createAction('chat/server/on');
export const serverOff = createAction('chat/server/off');
