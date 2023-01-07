import { FC, memo } from 'react';

import useTypedSelector from '@/src/hooks/useTypedSelector';
import { selectChatMessages } from '@/src/store/features/chat';

import MessageItem from '../MessageItem/MessageItem';

import styles from './Messages.module.scss';

interface MessagesProps {}

const Messages: FC<MessagesProps> = () => {
  const messages = useTypedSelector(selectChatMessages);

  return (
    <div className={styles.root}>
      {messages.map(({ ...message }, id) => (
        // eslint-disable-next-line react/no-array-index-key
        <MessageItem key={`${id}-${message.userId}`} {...message} className={styles.message} />
      ))}
    </div>
  );
};

export default memo(Messages);
