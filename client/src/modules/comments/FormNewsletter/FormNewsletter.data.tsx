import { GENERAL_ERROR } from '@/src/constants';
import { UseMutateNotification } from '@/src/hooks';

export const notification: UseMutateNotification = {
  success: () => ({
    title: 'Success!',
    message: 'Successfully registered for newsletter!',
    status: 'success',
  }),
  error: (message) => ({
    title: 'Error!',
    message: message || GENERAL_ERROR,
    status: 'error',
  }),
  pending: () => ({
    title: 'Signing up...',
    message: 'Registering for newsletter',
    status: 'pending',
  }),
};
