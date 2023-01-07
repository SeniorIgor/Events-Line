import { FC, memo } from 'react';

import Chat from './components/Chat/Chat';

import styles from './ChatPage.module.scss';

interface ChatPageProps {}

const ChatPage: FC<ChatPageProps> = () => {
  return (
    <div className={styles.root}>
      <Chat />
    </div>
  );
};

export default memo(ChatPage);
