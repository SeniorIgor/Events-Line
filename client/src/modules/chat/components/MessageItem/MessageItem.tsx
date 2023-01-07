import { FC, memo } from 'react';
import Image from 'next/image';

import { Message } from '@/src/types';

import styles from './MessageItem.module.scss';

interface MessageItemProps extends Omit<Message, 'id'> {
  className?: string;
}

const MessageItem: FC<MessageItemProps> = ({ message, userName, photo, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.image}>
        {photo && <Image src={photo} alt="avatar" className={styles.avatar} layout="fill" objectFit="cover" />}
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{userName}</span>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default memo(MessageItem);
