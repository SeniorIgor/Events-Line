import { FC, memo } from 'react';

import { login } from '@/src/components/services/websocketAPI/login';
import useTypedDispatch from '@/src/hooks/useTypedDispatch';
import { startChannel, stopChannel } from '@/src/store/features/chat';

import FormCreateMessage from '../FormCreateMessage/FormCreateMessage';
import Messages from '../Messages/Messages';

import styles from './Chat.module.scss';

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  const dispatch = useTypedDispatch();

  // useEffect(() => {
  //   dispatch(startChannel());

  //   return () => {
  //     dispatch(stopChannel());
  //   };
  // }, [dispatch]);

  return (
    <div className={styles.root}>
      {/* Replace to form */}
      <button
        type="button"
        onClick={() =>
          login({
            email: 'igor.tyapkin1996@yandex.ru',
            password: 'Igor1996',
            rememberMe: true,
          })
        }
      >
        Login
      </button>
      <button type="button" onClick={() => dispatch(startChannel())}>
        On
      </button>
      <button type="button" onClick={() => dispatch(stopChannel())}>
        Off
      </button>
      <Messages />
      <div className={styles.formWrapper}>
        <FormCreateMessage className={styles.form} />
      </div>
    </div>
  );
};

export default memo(Chat);
