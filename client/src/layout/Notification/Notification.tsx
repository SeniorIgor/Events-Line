import { FC, useCallback } from 'react';

import useTypedDispatch from '@/src/hooks/useTypedDispatch';
import { resetNotification } from '@/src/store/features/notification';

import { NotificationProps } from './Notification.types';

import styles from './Notification.module.scss';

const Notification: FC<NotificationProps> = ({ title, message, status }) => {
  const dispatch = useTypedDispatch();

  const handleClickReadNotification = useCallback(() => {
    dispatch(resetNotification());
  }, [dispatch]);

  return (
    <div
      className={cn(styles.notification, {
        [styles.success]: status === 'success',
        [styles.error]: status === 'error',
        [styles.pending]: status === 'pending',
      })}
      onClick={handleClickReadNotification}
      role="presentation"
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
