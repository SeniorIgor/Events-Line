import { GENERAL_ERROR } from '@/src/constants';
import { UseMutateNotification } from '@/src/hooks';

export const notification: UseMutateNotification = {
  success: () => ({
    title: 'Success!',
    message: 'Your comment was saved!',
    status: 'success',
  }),
  error: (message) => ({
    title: 'Error!',
    message: message || GENERAL_ERROR,
    status: 'error',
  }),
  pending: () => ({
    title: 'Sending comment...',
    message: 'Your comment is currently being stored into a database.',
    status: 'pending',
  }),
};
