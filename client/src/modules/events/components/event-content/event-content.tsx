import { FC } from 'react';

import styles from './event-content.module.scss';

const EventContent: FC = ({ children }) => {
  return <section className={styles.content}>{children}</section>;
};

export default EventContent;
